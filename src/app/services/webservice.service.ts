import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Subscription } from 'rxjs';
import {Subject} from 'rxjs';
var url = environment.api;

@Injectable({
  providedIn: 'root',
})
export class WebserviceService {
  private logoutData = new Subject<any>();
  private fooSubject = new Subject<any>();
  private profileimage = new Subject<any>();
  private SearchData = new Subject<any>();
  private Class_SearchData = new Subject<any>();
  private Type_search = new Subject<any>();
  subscriptions: Subscription[]=[];
  FilteredData:any[] = [];
  allcategory:string;
  lowerPrice:number  = 1;
  higherPrice:number;
  Latitude:number;
  Longitude:number;
  Address:any;
  classType:string = 'kids';
  classesList:any;
  subCategoryId:any;
  kidCategoryId:string="609155f8c1bef37b9230887a";
  adultCategoryId:string="60b41af8f3286a65034e5572";
  categoryId:any ;
  subCategorylisting:any;
  showList:boolean =true;
  classAdult:boolean=true;
  provider_Id:string;
  galleryPhoto:any;
  serviceList:any;

  public slugdata:string;
  public UserBaseURL = url + 'user/';
  public ServiceBaseURL = url + 'service/';
  public adminurl = url +'admin/'
  // public DeliveryBaseURL = url + "commercialPartner/";

  // cartCount = localStorage.getItem("cartCount");
  isLoggedIn = localStorage.getItem('access-token-quickmint') != undefined;

  UserFullName = localStorage.getItem('UserFullName');
  userType = localStorage.getItem('userType');
  // WishlistCount = localStorage.getItem("WishlistCount");

  httpOptions = {};
  constructor(private http: HttpClient) { }

  get_token() {
    var user_token = localStorage.getItem('access-token-quickmint');
    return user_token || '';
  }

  public registerUser(body: any) {
    let url = this.UserBaseURL + 'createUser';

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    // httpHeaders = httpHeaders.append("x-access-token", localStorage.getItem('##kkhj@hjh'));
    let options = { headers: httpHeaders };
    return this.http.post(url, body, options);
  }
  public registerProvider(body: any) {
    let url = this.ServiceBaseURL + 'createworkers';

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    // httpHeaders = httpHeaders.append("x-access-token", localStorage.getItem('##kkhj@hjh'));
    let options = { headers: httpHeaders };
    return this.http.post(url, body, options);
  }
  public loginUser(body: any, route: number) {
    console.log('route: ', route);
    let url;
    if (route == 2) {
      url = this.UserBaseURL + 'loginUser';
    } else url = this.ServiceBaseURL + 'login';

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    // httpHeaders = httpHeaders.append("x-access-token", localStorage.getItem('##kkhj@hjh'));
    let options = { headers: httpHeaders };
    return this.http.post(url, body, options);
  }
  public publicjob(body: any) {
    let url = this.UserBaseURL + 'publicjkjob';

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    // httpHeaders = httpHeaders.append("x-access-token", localStorage.getItem('##kkhj@hjh'));
    let options = { headers: httpHeaders };
    return this.http.post(url, body, options);
  }

  public privatejob(body: any) {
    let url = this.UserBaseURL + 'privatejob';

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    // httpHeaders = httpHeaders.append("x-access-token", localStorage.getItem('##kkhj@hjh'));
    let options = { headers: httpHeaders };
    return this.http.post(url, body, options);
  }

  public changePassword(body: any) {
    let url = this.UserBaseURL + 'changePassword';

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.put(url, body, options);
  }
  public editDetails(body: any) {
    let url = this.UserBaseURL + 'editDetails';

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.put(url, body, options);
  }
  public providerEditDetails(body: any) {
    let url = this.ServiceBaseURL + 'editDetails';

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.put(url, body, options);
  }
  public userOwnDetails() {
    let url = this.UserBaseURL + 'userOwnDetails';

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }
  public workersgallery(UserPhoto: any) {
    //Sending contact details
    // /service/workersgallery
    let url = this.ServiceBaseURL + 'workersgallery';
    console.log(UserPhoto);
    let input = new FormData();
    input.append('gallery', UserPhoto);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    httpHeaders.set('Content-Type', 'application/json');
    console.log(input);
    return this.http.post(url, input, options);
  }

  public workersgallery_video(video: any) {
    //Sending contact details
    // /service/workersgallery
    let url = this.ServiceBaseURL + 'workersvideo';
    console.log(video);
    let input = new FormData();
    input.append('video', video);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    httpHeaders.set('Content-Type', 'application/json');
    console.log(input);
    return this.http.post(url, input, options);
  }

  public serviceimage(UserPhoto: any,id:any) {
    //Sending contact details
    // /service/workersgallery
    let url = this.ServiceBaseURL + 'addservice-image-upload/'+id;
    console.log(UserPhoto);
    let input = new FormData();
    input.append('addImage', UserPhoto);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    httpHeaders.set('Content-Type', 'application/json');
    console.log(input);
    return this.http.post(url, input, options);
  }
  public documentupload(UserPhoto: any,photo_type:any) {
    //Sending contact details
    // /service/workersgallery
    let url = this.ServiceBaseURL + 'providerdocument';
    console.log(UserPhoto);
    let input = new FormData();
    input.append('document_upload', UserPhoto);
    input.append('file_name', photo_type);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    httpHeaders.set('Content-Type', 'application/json');
    console.log(input);
    return this.http.post(url, input, options);
  }

  public detlete_gallery(documenid:any){
    let url = this.ServiceBaseURL + 'removegallery';
    let input = new FormData();
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    httpHeaders.set('Content-Type', 'application/json');
    console.log(input);
    return this.http.post(url, documenid, options);
  }

  public detletedoc(documenid:any){
    let url = this.ServiceBaseURL + 'removedocument';
    let input = new FormData();
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    httpHeaders.set('Content-Type', 'application/json');
    console.log(input);
    return this.http.post(url, documenid, options);
  }

  public editDetailsWithImage(UserPhoto: any) {
    //Sending contact details
    let url = this.UserBaseURL + 'editDetailsWithImage';
    console.log(UserPhoto);
    let input = new FormData();
    input.append('UserPhoto', UserPhoto);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    httpHeaders.set('Content-Type', 'application/json');
    console.log(input);
    return this.http.put(url, input, options);
  }

  public providerEditDetailsWithImage(UserPhoto: any) {
    //Sending contact details
    let url = this.ServiceBaseURL + 'workersprofileimage';
    console.log(UserPhoto);
    let input = new FormData();
    input.append('profile', UserPhoto);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    httpHeaders.set('Content-Type', 'application/json');
    console.log(input);
    return this.http.post(url, input, options);
  }
  // forgotPasswordbyMail/biswajit.karmakar@brainiuminfotech.com/2
  public forgotPassword(body: any) {
    let url =
      this.UserBaseURL +
      'forgotPasswordbyMail/' +
      body.UserEmail +
      '/' +
      body.UserType;

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.put(url, body, options);
  }

  public categorySubcategory() {
    let url = this.UserBaseURL + 'categorysubcategory';

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    // httpHeaders = httpHeaders.append(
    //   "x-access-token",
    //   this.get_token()
    // );
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  public Servicelisting() {
    let url = this.ServiceBaseURL + 'servicepricelist';

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append(
      "x-access-token",
      this.get_token()
    );
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  public deleteService(Id: any) {
    let url = this.ServiceBaseURL + `servicepricedelet/${Id}`;

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.delete(url, options);
  }


  public categorylisting() {
    let url = this.UserBaseURL + 'categorylisting';

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    // httpHeaders = httpHeaders.append(
    //   "x-access-token",
    //   this.get_token()
    // );
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  

  // /user/subcategorylisting/ObjectID()
  public subcategorylisting(id: any) {
    let url = this.UserBaseURL + 'subcategorylisting/' + id;

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    // httpHeaders = httpHeaders.append(
    //   "x-access-token",
    //   this.get_token()
    // );
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }


  public topServiceList() {
    let url = this.UserBaseURL + 'topServiceList';

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    // httpHeaders = httpHeaders.append(
    //   "x-access-token",
    //   this.get_token()
    // );
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  public PopularServiceList() {
    let url = this.UserBaseURL + 'mostpopularservice';

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    // httpHeaders = httpHeaders.append(
    //   "x-access-token",
    //   this.get_token()
    // );
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }


  publicJobList() {
    let url = this.UserBaseURL + 'publicjoblist';

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  getLocalData(key: string) {
    return localStorage.getItem(key);
  }

  saveLocalData(key: any, data: any) {

    localStorage.setItem(key, JSON.stringify(data));
  }

  getProvidersList(data: any) {
    //console.log('da ', data);
    data.lowerPrice ? data.lowerPrice : (data.lowerPrice = 1);
    data.minAge ? data.minAge : (data.minAge = 6);
    data.maxAge ? data.maxAge : (data.maxAge = 12);

    data.age_group = data.minAge.toString() + '-' + data.maxAge.toString();

    //console.log('newda ', data);

    let url = `${this.UserBaseURL}listProvider/?category_id=${data.category_id}&sub_category_id=${data.sub_category_id}&Latitude=${data.Latitude}&Longitude=${data.Longitude}&age_group=${data.minAge}-${data.maxAge}&lowerPrice=${data.lowerPrice}`;

   // console.log('age: ', data);
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders, body: data };
    return this.http.get(url, options);
  }

  getServiceList(data:any) {
    // console.log('da ', data);
    // data.lowerPrice ? data.lowerPrice : (data.lowerPrice = 1);
    // data.minAge ? data.minAge : (data.minAge = 6);
    // data.maxAge ? data.maxAge : (data.maxAge = 12);

    // data.age_group = data.minAge.toString() + '-' + data.maxAge.toString();

    console.log('newdata ', this.Longitude,this.Latitude);
    if(data.distancemax!=undefined){
    let url = `${this.UserBaseURL}listofservice?allcategory=${data.allcategory}&lowerPrice=${data.lowerPrice}&higherPrice=${data.higherPrice}&Latitude=${this.Latitude}&Longitude=${this.Longitude}&distancemax=${data.distancemax}&distancemini=1`;
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }
    else{
      let url = `${this.UserBaseURL}listofservice?allcategory=${data.allcategory}&lowerPrice=${data.lowerPrice}&higherPrice=${data.higherPrice}&Latitude=${this.Latitude}&Longitude=${this.Longitude}`;
      let httpHeaders = new HttpHeaders();
      httpHeaders.set('Content-Type', 'application/json');
      httpHeaders = httpHeaders.append('x-access-token', this.get_token());
      let options = { headers: httpHeaders };
      return this.http.get(url, options);
    }
    //console.log('age: ', data);
    
  }

  getPrivateJobList() {
    let url = this.UserBaseURL + 'privatejoblist';

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  getProviderPrivateJobList() {
    let url = this.ServiceBaseURL + 'privatejoblist';

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  changePrivateJobStatus(data: any) {
    let url = this.ServiceBaseURL + 'privatejobstatus';

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.put(url, data, options);
  }

  GetCms(slug:any){
    let url = this.UserBaseURL + `cmslist/${slug}`;

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    // httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  getCmsList() {
    let url = this.UserBaseURL + 'cmsmenu';

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
   // httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  getAdminContact(){
      let url = this.UserBaseURL + 'cmscontactmenu';
  
      let httpHeaders = new HttpHeaders();
      httpHeaders.set('Content-Type', 'application/json');
     // httpHeaders = httpHeaders.append('x-access-token', this.get_token());
      let options = { headers: httpHeaders };
      return this.http.get(url, options);
  }

  public getNext(api: any) {
    let url = this.UserBaseURL + api;

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  public handleSubcat(id: any) { }

  //subcat (level 2) listing

  public getsubcategorylistingOne(id: any) {
    let url = this.UserBaseURL + 'subcategorylistingOne/' + id;
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  //subcat (level 1) listing

  public getsubcategorylistingTwo(id: any) {
    let url = this.UserBaseURL + 'subcategorylistingTwo/' + id;
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }
  //normal subcat (level 0) listing
  public providerServiceList(id: any) {
    let url = this.UserBaseURL + 'providerServiceList/' + id;
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  //get providers of subcatOne (level 1) listing
  public getTrainingProviders(id: any) {
    let url = this.UserBaseURL + 'trainingProviders/' + id;
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  //get providers of subcatTwo (level 2) listing
  public SubjectProviders(id: any) {
    let url = this.UserBaseURL + 'subjectProviders/' + id;
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  public addContact(f: any) {
    console.log('addContact: ', f);
    let url = this.UserBaseURL + 'createcontact';

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };

    return this.http.post(url, f, options);
  }

  public addService(f: any) {
    console.log('addService: ', f);
    let url = this.ServiceBaseURL + 'addservice';

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'multipart/form-data');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };

    return this.http.post(url, f, options);
  }

  public editService(data:any,id:any) {
   // console.log('addService: ', f);
    let url = this.ServiceBaseURL + 'editservice/'+ id;

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'multipart/form-data');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };

    return this.http.post(url,data, options);
  }

  public getServiceDetails(id: any) {
    let url = this.ServiceBaseURL + 'servicedetails/' + id;

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  public getworkerdetails() {
    let url = this.ServiceBaseURL + 'workerdetails';

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  public getBanner() {
    let url = this.UserBaseURL + 'getBanner';

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  public getOffer() {
    let url = this.UserBaseURL + 'offerlist';

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  public getClassesList(value:any) {
    let url = this.UserBaseURL + `allTrainingServices`;

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  public getClasList() {
    
    let url = this.ServiceBaseURL + `TrainingService`;
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  public getUserClasList(data:any) {
    console.log(data)
    //let url = this.UserBaseURL + `allTrainingServices`;
    let url = `${this.UserBaseURL}allTrainingServices/?Usertype=${data.UserType}&price_range=${data.price_range}&age_range=${data.age_range}&grade_from=${data.grade_from}&grade_to=${data.grade_to}
    &class=${data.class}&category=${data.category}&Latitude=${data.Latitude}&Longitude=${data.Longitude}&distancemax=${data.distancemax}&strat_date=${data.strat_date}&class_type=${data.class_type}&sorting_date=${data.sorting_date}&page=${data.page}&limit=${data.limit}`;
    // if(data.SerachType=='UserType'){
    //   url = `${this.UserBaseURL}allTrainingServices/?Usertype=${data.UserType}`;
    // }else if(data.SerachType=='Price'){
    //   url = `${this.UserBaseURL}allTrainingServices/?Usertype=${data.UserType}&priceMax=${data.priceMax}&priceMini=${data.priceMini}`;
    // }
    // else{
    //   url = `${this.UserBaseURL}allTrainingServices`;
    // }

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  gerclasscategory(data:any){
    
    let url = this.ServiceBaseURL + `classcategory?page=${data.page}&limit=${data.limit}`;

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  public getRelatedClassList(value:any,subcategoryId:any) {
    let url = this.UserBaseURL + `allTrainingServices?${this.classType}=true&sub_category_id=${subcategoryId}`;

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }




  public getClassDetail(id: any) {
    let url = this.UserBaseURL + 'TrainingDetails/' + id;

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  public getClassDetail_provider(id: any) {
    let url = this.ServiceBaseURL + 'TrainingServiceFinddetails/' + id;

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  public edit_class(data:any,id: any) {
    let url = this.ServiceBaseURL + 'teacherConferenceupdate/' + id;

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.post(url,data, options);
  }


  public askquestion(data:any){
    let url = this.UserBaseURL + 'askquestion/';

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.post(url,data, options);
  }

  public all_askquestion(id:any,page:any,limit:any){
   
    let url = `${this.UserBaseURL}providerallquestionlist/`+id+`?page=${page}&limit=${limit}/`;
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  public give_answer(data:any){
    let url = this.UserBaseURL + 'givenanswe/';

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.post(url,data, options);
  }

  public ask_question_list(id:any){
    let url = this.UserBaseURL + 'questionanserlist/' + id;

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url,options);
  }

  public ask_question_list_provider(id:any){
    let url = this.ServiceBaseURL + 'providerclassquestionlist/' + id;

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url,options);
  }

  public class_rating_list_user(id:any){
    let url = this.UserBaseURL + 'getreviewratingclass/' + id;

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url,options);
  }

  public class_rating_list_provider(id:any){
    let url = this.UserBaseURL + 'getreviewratingclass/' + id;

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url,options);
  }

  public rating_list_user(id:any,page:any,limit:any){
    let url = this.UserBaseURL + 'getreviewratingprovider/' + id;

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url,options);
  }

  public classfeedback(data:any){
    let url = this.UserBaseURL + 'SubmitReviewRating/';
    
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.post(url, data, options);
  }

  public delete_class(id: any) {
    let url = this.ServiceBaseURL + 'deleteclass/' + id;

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.delete(url, options);
  }

  public getclasslistbycategory(data:any){
    let url = this.UserBaseURL + `providercategoryclass?provider_id=${data.provider_id}&category_id=${data.category_id}`;

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }
  public bookClass(id: any, body: any) {
    let url = this.UserBaseURL + 'BookTraining/' + id;
    console.log(id, body);
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.post(url, body, options);
  }

  public registerClass(data: any) {
    let url = this.ServiceBaseURL + 'TeacherConference';

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };

    return this.http.post(url, data, options);
  }

  public bookService(data: any,TrainingValue:any) {
    let url = this.UserBaseURL + 'BookTraining/' + TrainingValue;

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };

    return this.http.post(url, data, options);
  }

  trainingPayment(bookingId:any,token:any){
    let data = {
      token : token
    }

    console.log('data in training service', bookingId, token);
    let url = this.UserBaseURL + 'traningpaymentpayment/' + bookingId;

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };

    return this.http.post(url, data, options);
  }

  servicebooking(data:any) {
    let url = this.ServiceBaseURL + 'TeacherConference/';
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.post(url, data, options);
  }

  public getClassesListProvider(id: any,value:any) {
    let url = this.ServiceBaseURL + 'TrainingService/' + id;

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  public Approve_class(id: any) {
    let data
    let url = this.ServiceBaseURL + 'bookstudentpaymentupdate/' + id;

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.post(url,data, options);
  }

  getbookedTraining(id: any) {
    let url = this.UserBaseURL + 'usertrainingdetails/' + id;

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  getUserBookedList(data:any) {
    let url = this.UserBaseURL + 'usertraininglist/'+'?page=' + data.page+ '&limit='+data.limit;

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  getprovider_classBookedList() {
    let url = this.ServiceBaseURL + 'bookstudentlist/';

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  bookingDetails_provider(id:any){
    let url = this.ServiceBaseURL + 'bookindetails/' + id;

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  AddStripeAccount(){
    let url = this.ServiceBaseURL + 'stripaccount/';

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  VerifyStripeAccount(){
    let url = this.ServiceBaseURL + 'stripaccountverify/';

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  getKidsCategory(){
    let url = this.UserBaseURL + 'subcategorylisting/609155f8c1bef37b9230887a';

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }
  getAdultsCategory(){
    let url = this.UserBaseURL + 'subcategorylisting/60b41af8f3286a65034e5572';

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  viewDetails(providerId:any){
    let url = this.UserBaseURL + 'viewdetails/' + providerId;

    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    //httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  follow(data:any){
   // console.log('data in training service', bookingId, token);
    let url = this.UserBaseURL + 'followcreate/'
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.post(url, data, options);
  }
  getFollowerList(){
    let url = this.UserBaseURL + 'follower/';
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    //httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  like(data:any){
    let url = this.UserBaseURL + 'likecreate/'
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };

    return this.http.post(url, data, options);
  }

  getLikeList(){
    let url = this.UserBaseURL + 'likelist/';
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    //httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  public addCredentials(f: any) {
    console.log('addCredentials: ', f);
    let url = this.ServiceBaseURL + 'addcredentials';
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };

    return this.http.post(url, f, options);
  }

    addFAQs(f: any) {
    let url = this.ServiceBaseURL + 'createfaq';
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };

    return this.http.post(url, f, options);
  }
  getfaqList(){
    let url = this.ServiceBaseURL + 'listoffaq';
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  deleteFaq(Id:any){
      let url = this.ServiceBaseURL + `faqdelete/${Id}`;
      let httpHeaders = new HttpHeaders();
      httpHeaders.set('Content-Type', 'application/json');
      httpHeaders = httpHeaders.append('x-access-token', this.get_token());
      let options = { headers: httpHeaders };
      return this.http.delete(url, options);   
  }

  getfeedbackList(){
    let url = this.ServiceBaseURL + 'providerfeedback';
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  checkFollowing(providerId:string){
    let url = this.UserBaseURL + 'follower/' +providerId;
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  checkLiking(providerId:string){
    let url = this.UserBaseURL + 'likelist/' +providerId;
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  postSchedule(data:any){
    let url = this.ServiceBaseURL + "workersupdateschedule";
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };

    return this.http.post(url, data, options);
  }

  post_additionalSchedule(data:any){
    let url = this.ServiceBaseURL + "dateoverride";
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };

    return this.http.post(url, data, options);
  }

  provideFeedback(data:any){
    let url = this.UserBaseURL + 'SubmitReviewRating'
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };

    return this.http.post(url, data, options);
  }

  public servicelist(){
    let url = this.ServiceBaseURL + 'categorylist/';
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url, options);
  }

  public Addservice_provider(data:any){
    let url = this.ServiceBaseURL + 'addproviderservice/';
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.post(url, data,options);
  }

  public Addservice_list(type:any){
    let url = this.ServiceBaseURL + `providerservicecategory?category_for=${type}`;
    
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url,options);
  }

  public addTax(body:any){
    let url = this.ServiceBaseURL + `addprovidertax`;
    
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.post(url,body,options);
  }


  public taxList(){
    let url = this.ServiceBaseURL + `providertaxlisting`;
    
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url,options);
  }

  public service_list(id:any){
    let url = this.ServiceBaseURL + `servicecategory?sub_category_id=${id}`;
    
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url,options);
  }

  public add_servicelist(body:any){
    let url = this.ServiceBaseURL + `addservicecategory`;
    
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.post(url,body,options);
  }

  public plannerList(start_date:any,end_date:any){
    let url = this.ServiceBaseURL + `planner?start_date=${start_date}&end_date=${end_date}`;
    
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url,options);
  }

  public faq_list(userType:any,page:any,limit:any){
    let url = this.UserBaseURL + `faqquestion?userType=${userType}&page=${page}&limit=${limit}`;
    
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url,options);
  }
  public videolink(body:any){
    let url = this.ServiceBaseURL + `workersvideolink`;
    
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.post(url,body,options);
  }

  public address_list(){
    let url = this.ServiceBaseURL + `createUseraddresslist`;
    
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url,options);
  }

  public addadress(data:any){
    let url = this.ServiceBaseURL + `createUseraddress`;
    
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.post(url,data,options);
  }

  public select_servicelist(){
    let url = this.ServiceBaseURL + `providerservicelist`;
    
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url,options);
  }

  public delete_addadress(id:any){
    let url = this.ServiceBaseURL + `deleteuseraddress/`+id;
    
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url,options);
  }

  getAllProvidersList(data: any) {
    console.log('da 1', data);
    let url
    if(data.distance==undefined){
      url = `${this.UserBaseURL}allproviderlist/?category_id=${data.category_id}&Latitude=${data.Latitute}&Longitude=${data.Longitude}`;
    }
    else{
      console.log('da 2', data);
      url = `${this.UserBaseURL}allproviderlist/?category_id=${data.category_id}&Latitude=${data.Latitute}&Longitude=${data.Longitude}&distance=${data.distance}`;
    }
    

   // console.log('age: ', data);
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders, body: data };
    return this.http.get(url, options);
  }

  getAllservice(){
    let url = this.UserBaseURL + `allproviderlist/`;
    
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url,options);
  }


  allCategories(){
    let url = this.UserBaseURL + `allcategorylisting/`;
    
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url,options);
  }

  distanceList() {
    //console.log('da ', data);
    
    let url = `${this.adminurl}distancelist/`;

   // console.log('age: ', data);
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders};
    return this.http.get(url, options);
  }
  
  allServicecategory(){
    let url = `${this.adminurl}allservicelist/`;

    // console.log('age: ', data);
     let httpHeaders = new HttpHeaders();
     httpHeaders.set('Content-Type', 'application/json');
     httpHeaders = httpHeaders.append('x-access-token', this.get_token());
     let options = { headers: httpHeaders};
     return this.http.get(url, options);
  }

  allService_class(){
    let url = `${this.UserBaseURL}allservicelist/`;

    // console.log('age: ', data);
     let httpHeaders = new HttpHeaders();
     httpHeaders.set('Content-Type', 'application/json');
     httpHeaders = httpHeaders.append('x-access-token', this.get_token());
     let options = { headers: httpHeaders};
     return this.http.get(url, options);
  }

  get_prover_servicelist(id:any,page:any,limit:any) {
    //console.log('da ', data);
    
    let url = `${this.UserBaseURL}providerServiceList/`+id+`?page=${page}&limit=${limit}/`;

   // console.log('age: ', data);
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders};
    return this.http.get(url, options);
  }

  public check_availibility(start_date:any,end_date:any,providerid:any){
    let url = this.UserBaseURL + `planner/`+providerid+`?start_date=${start_date}&end_date=${end_date}`;
    
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url,options);
  }

  public get_prover_classlist(id:any,page:any,limit:any) {
    //console.log('da ', data);
    
    let url = `${this.UserBaseURL}providerclasslist/`+id+`?page=${page}&limit=${limit}`;

   // console.log('age: ', data);
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders};
    return this.http.get(url, options);
  }

  

  public user_transaction_list(page:any,limit:any) {
    //console.log('da ', data);
    
    let url = `${this.UserBaseURL}usertransuction/`+`?page=${page}&limit=${limit}/`;

   // console.log('age: ', data);
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders};
    return this.http.get(url, options);
  }

  public provider_transaction_list(page:any,limit:any) {
    //console.log('da ', data);
    
    let url = `${this.ServiceBaseURL}usertransuction/`+`?page=${page}&limit=${limit}/`;

   // console.log('age: ', data);
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders};
    return this.http.get(url, options);
  }

  public user_transaction_details(id:any) {
    //console.log('da ', data);
    
    let url = `${this.UserBaseURL}usertransuctiondetails/`+id;

   // console.log('age: ', data);
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders};
    return this.http.get(url, options);
  }

  public provider_transaction_details(id:any) {
    //console.log('da ', data);
    
    let url = `${this.ServiceBaseURL}usertransuctiondetails/`+id;

   // console.log('age: ', data);
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders};
    return this.http.get(url, options);
  }


  public book_appointment(data:any){
    let url = this.UserBaseURL + `bookappointment/`;
    
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.post(url,data,options);
  }

  public getActive_bookinglist(){
    let url = this.ServiceBaseURL + `bookclassactive/`;
    
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url,options);
  }

  public getInActive_bookinglist(){
    let url = this.ServiceBaseURL + `bookclassinactive/`;
    
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url,options);
  }

  public class_bookingDetails(id:any){
    let url = this.ServiceBaseURL + `bookstudentdetails/` +id ;
    
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url,options);
  }

  public get_gradelist(){
    let url = this.ServiceBaseURL + `gredlist/`;
    
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url,options);
  }

  public postclassImage(data:any,id:any){
    let url = this.ServiceBaseURL + `TeacherConferenceUploadimage/`+id;
    
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.post(url,data,options);
  }

  public provider_viewCount(){
    let url = this.ServiceBaseURL + `showviewcount/`;
    
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url,options);
  }

  public provider_classbookcount(){
    let url = this.ServiceBaseURL + `bookclasscount/`;
    
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url,options);
  }

  public get_classwise_booking(data:any){
    let url = this.ServiceBaseURL + `classwithTeacher/`+ '?page='+data.page+ '&limit='+ data.limit;
    
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url,options);
  }

  public sendcallback(data:any){
    let url = this.UserBaseURL + `callbackrequest`;
    
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.post(url,data,options);
  }

  public request_list(){
    let url = this.ServiceBaseURL + `callbacklist`;
    
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url,options);
  }

  public monthlyrevenue_list(data:any){
    let url = this.ServiceBaseURL + `monthlytransactionhistory` +  '?last_month='+data.month+ '&page='+data.page+ '&limit='+ data.limit;
    
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url,options);
  }

  public yearlyrevenue_list(data:any){
    let url = this.ServiceBaseURL + `yearltransactionhistory` +   '?page='+data.page+ '&limit='+ data.limit;
    
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url,options);
  }

  public currentRevenue(data:any){
    let url = this.ServiceBaseURL + `currentrevenue` +   '?start_date='+data.start_date+ '&end_date='+ data.end_date;
    
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url,options);
  }
  public totalRevenue(){
    let url = this.ServiceBaseURL + `totalrevenueytd`;
    
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('x-access-token', this.get_token());
    let options = { headers: httpHeaders };
    return this.http.get(url,options);
  }

  dispose(){
    this.subscriptions.forEach(subscription =>subscription.unsubscribe())
  }

  publishlogoutData(data: any) {
    this.logoutData.next(data);
  }

  getObservablelogout(): Subject<any> {
    return this.logoutData;
  }

  getObservable(): Subject<any> {
    return this.fooSubject;
}
publishSomeData(data: any) {
  this.fooSubject.next(data);
}


getObservableProfileimage(): Subject<any> {
  return this.profileimage;
}
publishprofileImage(data: any) {
this.profileimage.next(data);
}

getObservableSerach(): Subject<any> {
  return this.SearchData;
}
publishserach(data: any) {
this.SearchData.next(data);
}

getObservableClassSerach(): Subject<any> {
  return this.Class_SearchData;
}
publishClassserach(data: any) {
this.Class_SearchData.next(data);
}


getObservable_type(): Subject<any> {
  return this.Type_search;
}
publish_type(data: any) {
this.Type_search.next(data);
}


}
