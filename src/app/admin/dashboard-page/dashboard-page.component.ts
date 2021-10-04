import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from "../../shared/posts.service";
import {Post} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[];
  postSub!: Subscription;
  searchStr: string;
  delSub!:Subscription;

  constructor(private postService: PostsService, private alertService: AlertService) {
    this.posts = [];
    this.searchStr = '';
  }

  ngOnInit(): void {
    this.postSub = this.postService.getAll().subscribe(posts => {
      this.posts = posts;
    })
  }

  ngOnDestroy(): void {
    if (this.postSub) this.postSub.unsubscribe();
    if (this.delSub) this.delSub.unsubscribe();
  }

  remove(id: any) {
   this.delSub = this.postService.remove(id).subscribe(()=> {
      this.posts = this.posts.filter(post => post.id !== id);
      this.alertService.danger('Deleted!');
    })
  }
}
