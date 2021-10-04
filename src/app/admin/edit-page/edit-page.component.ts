import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PostsService} from "../../shared/posts.service";
import {switchMap} from "rxjs/operators";
import {Post} from "../../shared/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {
  form:FormGroup;
  post!: Post;
  submitted: boolean;
  uSub!: Subscription;
  constructor(private route: ActivatedRoute, private postService: PostsService,
              private router:Router, private alertService: AlertService) {
    this.form = new FormGroup({
      title: new FormControl('def', Validators.required),
      text: new FormControl('def', Validators.required)
    });
    this.submitted = false;
  }


  ngOnInit(): void {
    this.route.params.pipe(switchMap( (params:Params) => {
      return this.postService.getById(params['id'])
    })).subscribe((post:Post)=> {
        this.post = post;
        this.form = new FormGroup({
          title: new FormControl(post.title,Validators.required),
          text: new FormControl(post.text, Validators.required)
        })
    })
  }

  ngOnDestroy() {
    if (this.uSub) this.uSub.unsubscribe()
  }

  submit() {
    if (this.form.invalid) return
    this.submitted = true;
    this.uSub = this.postService.update({
      ...this.post,
      title: this.form.value.title,
      text: this.form.value.text,
    }).subscribe(() => {
      this.submitted = false;
      this.alertService.warning('Updated!');
      this.router.navigate(['/admin','dashboard']);
    })
  }
}
