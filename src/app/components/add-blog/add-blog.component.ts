import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddBlogService } from '../services/add-blog.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogModel } from '../models/add-blog-model';
import { Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements OnInit, AfterViewInit {
  @Output() backEmit = new EventEmitter<any>();
  @Input() updatedBlogData: any;
  public blogModel = new BlogModel();
  public file: any[] = [];
  public value = {}
  public base64Image: string | null = null;
  public blogData = [{description: '', file: ''}];
  public cloneFiles: any[] = [];
  public removedFiles: any;
  public titleValidation: boolean = false;
  public Editor = ClassicEditor;
  public destroye$ = new Subject<any>();
  public filePath = environment.filePath;


  constructor(
    private addBlogService: AddBlogService,
    private fb: FormBuilder
  ) {
   }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if(this.updatedBlogData?._id) {
      this.getBlogById();
    }
  }

  addBlog(value?: any) {
    this.settingUpValues();
    if(this.updatedBlogData?._id) {
      this.updateBlogById()
    } else {
      this.createBlog();
    }
  }

  createBlog() {
    this.addBlogService.addBlog(this.blogModel)
      .pipe(takeUntil(this.destroye$))
      .subscribe(res => {
        this.back();
      }, error => {
        console.log(error);
      })
  }

  getBlogById() {
    this.addBlogService.getBlogById(this.updatedBlogData._id)
    .pipe(takeUntil(this.destroye$))
    .subscribe((result: any) =>{
      console.log('here result', result);
      const {data : {title, value, _id}} = result;
      this.blogModel.title = title;
      this.blogModel._id = _id;
      this.blogData = value;
    }, error => {
      console.log(error);
    })
  }

  updateBlogById() {
    this.blogModel.imagePath = this.blogData.filter(result => result.file.includes('src/uploads')).map(res => res.file).toString();
    this.addBlogService.updataBlog(this.blogModel)
    .pipe(takeUntil(this.destroye$))
    .subscribe(result => {
      console.log(result, 'result here');
      this.back();
    }, error => {
      console.log(error, 'error here')
    })
  }

  settingUpValues() {
    let description = ''
    for(let i = 0; i < this.blogData?.length; i++) {
      description += this.blogData[i].description + '--SPLIT_HERE--';
    }
    this.blogModel.description = description;
    this.blogModel.file = this.file;
    console.log(this.blogData, 'value here');
    if(!this.blogModel.title) {
      this.titleValidation = true;
      return
    } else{
      this.titleValidation = false;
    }
  }


  


  selectFiles(file: any, i: number) {
    if(!this.file.length) {
      this.file.push(file.target.files);
      this.cloneFiles.push(file.target.files[0].name)

    } else {
      let index = this.cloneFiles.findIndex(res => res === this.removedFiles);
      if(index < 0) {
        this.file.push(file.target.files);
        this.cloneFiles.push(file.target.files[0].name)
      } else {
        this.file.splice(index, 0, file.target.files);
        this.cloneFiles[index] = file.target.files[0].name

      }
    }
    const inputElement = file.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const selectedFile = inputElement.files[0];
      this.convertToBase64(selectedFile, i);
    }
  }

  convertToBase64(file: File, i: number): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.base64Image = reader.result as string;
      this.blogData[i].file = this.base64Image;

    };
    reader.readAsDataURL(file);
  }

  addSection() {
    this.blogData.push({description: '', file: ''});
    this.removedFiles = '';
  }

  removeImg(i: number) {
    this.blogData[i].file = '';
    this.file.splice(i, 1);
    this.removedFiles = this.file[i][0]?.name;
  }

  back() {
    this.backEmit.emit();
  }

}
