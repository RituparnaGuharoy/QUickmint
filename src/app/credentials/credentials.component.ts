import { Component, OnInit, OnDestroy,ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormsModule, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WebserviceService } from '../services/webservice.service';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.css']
})
export class CredentialsComponent implements OnInit {
  @ViewChild("myckeditor") ckeditor: any;
  name = 'ng2-ckeditor';
  ckeConfig: any;
  mycontent: string;
  log: string = '';

  public Editor = ClassicEditor;
  public config = {
    ckfinder: {
      options: {
          resourceType: 'Images'
      },
      //uploadUrl: this.BACK_END_MAPPING_URL_FOR_SAVE_IMG, // image-upload.php
    },
    placeholder: 'Type the content here!'
 }

  first = new FormControl('');
  credentialsForm = new FormGroup({
    credentials: new FormControl('', Validators.required),
})
  

  get f() {
    return this.credentialsForm.controls;
  }
  

  constructor(
    private formBuilder: FormBuilder,
    private service: WebserviceService,
    private toastr: ToastrService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {

     this.credentialsForm.setValue({
        credentials: ''
       })

       this.ckeConfig = {
      allowedContent: false,
      forcePasteAsPlainText: true,
      font_names: 'Arial;Times New Roman;Verdana',
      toolbarGroups: [
        { name: 'document', groups: ['mode', 'document', 'doctools'] },
        { name: 'clipboard', groups: ['clipboard', 'undo'] },
        { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
        { name: 'forms', groups: ['forms'] },
        '/',
        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
        { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
        { name: 'links', groups: ['links'] },
        { name: 'insert', groups: ['insert'] },
        '/',
        { name: 'styles', groups: ['styles'] },
        { name: 'colors', groups: ['colors'] },
        { name: 'tools', groups: ['tools'] },
        { name: 'others', groups: ['others'] },
        { name: 'about', groups: ['about'] }
      ],
      removeButtons: 'Source,Save,NewPage,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Undo,Redo,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Strike,Subscript,Superscript,CopyFormatting,RemoveFormat,Outdent,Indent,CreateDiv,Blockquote,BidiLtr,BidiRtl,Language,Unlink,Anchor,Image,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Maximize,ShowBlocks,About'
    };
  
  }

  onSubmit() {
    let credentialsdata = {
     credentials: this.mycontent
    }
    console.log('credentials', credentialsdata);
    this.service.addCredentials(credentialsdata).subscribe(
      (data:any) => {
        console.log('cred data: ', data);
        if(data.status == true){
        this.toastr.success('Your credential has been saved');
        }
        this.credentialsForm.reset();
      },
      (err) => {
        console.log(err);
        this.toastr.success('Your credential has not been saved');
      }
    );
  }

  public onChange( { editor }: ChangeEvent ) {
    const data = editor.getData();
    console.log('editor data ===', data );
}

}
