/// <reference types="@types/googlemaps" />

import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators, FormsModule } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { WebserviceService } from '../services/webservice.service';

import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { GeolocationService } from '../services/geolocation.service';
import { Title } from '@angular/platform-browser';
import {
  Location,
  Appearance,
  GermanAddress,
} from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;

declare var google: any;

@Component({
  selector: 'app-post-a-need',
  templateUrl: './post-a-need.component.html',
  styleUrls: ['./post-a-need.component.css'],
})
export class PostANeedComponent implements OnInit {
  //for map display
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  mappa: any;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  //for map auto search
  public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public selectedAddress: PlaceResult;

  GoogleAutocomplete: any;
  geocoder: any;
  autocompleteItems: any = [];
  autocompleteItems2: any = [];
  markers: { fromMarker?: any; toMarker?: any } = {};
  distance: number = 0;
  displayedLocationDescription: any;

  privateJob = false;
  userForm: any;
  userFormSubmitted: boolean = false;
  categorylisting: any;
  subcategorylisting: any;
  showSubCat: boolean = true;
  data: { [k: string]: any } | undefined;
  marker: any;

  constructor(
    private formBuilder: FormBuilder,
    private service: WebserviceService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private location: GeolocationService,
    private zone: NgZone,
    private titleService: Title
  ) {
    this.route.queryParams.subscribe((params) => {
      //User getting a quote from service-provider-list
      if (this.router.getCurrentNavigation()!.extras.state) {
        console.log('In Here');
        this.data = this.router.getCurrentNavigation()!.extras.state;
        console.log('data in post a need: ', this.data);

        this.privateJob = true;
      } else {
        console.log('In There');
        this.privateJob = false;
      }
    });

    // this.getadd()
  }

  //  getadd() {
  //    this.location.getPosition()
  //  }

  ngOnInit() {
    //maps display
    this.geocoder = new google.maps.Geocoder();
    //maps
    // this.titleService.setTitle(
    //   'Home | @angular-material-extensions/google-maps-autocomplete'
    // );

    this.zoom = 10;
    this.latitude = 52.520008;
    this.longitude = 13.404954;

    this.setCurrentPosition();

    //maps end

    if (localStorage.getItem('access-token-quickmint') == undefined) {
      this.toastr.success('Please login to add a post');
      this.router.navigate(['/login']);
    }
    this.userForm = this.newForm();

    this.userForm.get('Address').valueChanges.subscribe((value: any) => {
      console.log('value changed', value);
      this.mappa = value;
      // this.userForm.value.Address = value;
    });

    this.getCategory();

    // this.getSubcategory()
  }

  loadMap() {
    console.log('latitude ', this.latitude);
    console.log('lng ', this.longitude);

    let latLng = new google.maps.LatLng(this.latitude, this.longitude);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
    };
    console.log('mapElement ', this.mapElement);
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setOptions({ suppressMarkers: true });
    this.map.addListener('click', (mapMouseEvent: any) => {
      console.log('mapMouseEvent: ', mapMouseEvent);
      this.onLocationSelected({
        latitude: mapMouseEvent.latLng.lat(),
        longitude: mapMouseEvent.latLng.lng(),
      });
      console.log('mapMouseEvent.lat: ', mapMouseEvent.latLng.lat());
      console.log('mapMouseEvent.lng: ', mapMouseEvent.latLng.lng());
    });

    this.marker = new google.maps.Marker({
      map: this.map,
      draggable: true,
      position: {
        lat: this.latitude,
        lng: this.longitude,
      },
    });
    this.dragMarkerEvent(this.marker);
  }

  dragMarkerEvent(marker: any) {
    // this.showMarker(location, place, marker)

    console.log('dragMarkerEvent');
    console.log(marker);
    marker.addListener('dragend', (ev: any) => {
      console.log('ev', ev);
      console.log(marker.getPosition());
      let latLng = marker.getPosition();
      console.log('latLng: ', latLng);
      console.log('latLng.lat(): ', latLng.lat());
      console.log('latLng.lng(): ', latLng.lng());

      this.onLocationSelected({
        latitude: latLng.lat(),
        longitude: latLng.lng(),
      });

      this.geocoder.geocode(
        {
          latLng: latLng,
        },
        (data: any, status: any) => {
          console.log('dragMarkerEvent data, status', data, status);
          if (status == google.maps.GeocoderStatus.OK) {
            // this.mappa = data[1]; //this is the full address

            console.log('hererijwekihj');
            //this.displayedLocationDescription = data[1].formatted_address
            this.userForm.controls['Address'].setValue(
              data[1].formatted_address
            );
            this.mappa = data[1].formatted_address;
          }
        }
      );
      // this.showMarker(location, place, marker)
    });
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

        this.userForm.controls['Latitude'].setValue(this.latitude);
        this.userForm.controls['Longitude'].setValue(this.longitude);
        this.zoom = 12;

        this.loadMap();
      });
    }
  }

  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
  }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;

    this.userForm.controls['Latitude'].setValue(this.latitude);
    this.userForm.controls['Longitude'].setValue(this.longitude);

    let latlng = {
      lat: this.latitude,
      lng: this.longitude,
    };
    this.marker.setPosition(latlng);
    this.map.setCenter(latlng);
    this.map.setZoom(12);
  }

  onGermanAddressMapped($event: GermanAddress) {
    console.log('onGermanAddressMapped', $event);
    let add = $event.displayAddress;
    this.userForm.controls['Address'].setValue(add);
    this.mappa = add;
    console.log('add: ', this.userForm.controls['Address']);
  }

  getCategory() {
    this.service.categorylisting().subscribe(
      (data) => {
        console.log('categorylisting', data);
        this.categorylisting = (<any>data)['data'];
        // this.toastr.success((<any>data)["message"]);

        // this.router.navigate(['/login'])

        if (this.privateJob) {
          this.selectCategory();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  selectCategory() {
    this.categorylisting.filter((e: any) => {
      if (e._id === this.data!.category_id._id) {
        this.userForm.controls['category_id'].setValue(e);
      }
    });
    console.log(this.userForm.controls['category_id']);
    console.log('this.userForm.controls: ', this.userForm.controls);
    console.log(
      'this.userForm.value.category_id.name',
      this.userForm.value.category_id.name
    );
    this.getSubcategory(this.userForm.value.category_id._id);
  }

  getSubcategory(id?: any) {
    console.log(
      'this.userForm.value.category_id',
      this.userForm.value.category_id
    );

    let arg = id ? id : this.userForm.value.category_id;
    this.service.subcategorylisting(arg).subscribe(
      (data: any) => {
        console.log('getSubcategory data: ', data);
        this.subcategorylisting = (<any>data)['data'];

        if (this.privateJob) {
          this.selectSubCat();
        }
        data.count === 0 ? (this.showSubCat = false) : (this.showSubCat = true);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  selectSubCat() {
    this.subcategorylisting.filter((e: any) => {
      if (e._id === this.data!.subcat_id) {
        this.userForm.controls['subcategory_id'].setValue(e);
      }
    });
    console.log(this.userForm.controls['subcategory_id']);
    console.log('this.userForm.controls: ', this.userForm.controls);
  }

  newForm() {
    return this.formBuilder.group({
      job_title: ['', [Validators.required]],
      job_description: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      subcategory_id: [''], //[Validators.required]
      jobDate: ['', [Validators.required]],
      open_time: ['', [Validators.required]],
      close_time: ['', [Validators.required]],
      price: ['', [Validators.required]],
      Latitude: [12, [Validators.required]],
      Longitude: [12, [Validators.required]],
      Address: ['', [Validators.required]],
      status: [1],
      user_id: [localStorage.getItem('userId')],
      provider_id: [''],
    });
  }
  get f() {
    return this.userForm.controls;
  }
  onSubmit() {
    if (this.privateJob) {
      this.userForm.controls['status'].setValue(1);
      this.userForm.controls['provider_id'].setValue(this.data!.provider_id);
    }
    this.userForm.value.category_id = this.userForm.value.category_id._id;
    this.userForm.value.subcategory_id = this.userForm.value.subcategory_id._id;
    console.log(this.userForm.value);
    if (!this.userForm.valid) {
      this.userFormSubmitted = true;
      this.toastr.warning('Please fill all required data');
      return;
    }
    // debugger
    let op_time = new Date(this.userForm.value.jobDate);
    let o = moment(this.userForm.value.open_time, ['h:mm A']).format('HH');
    let o2 = moment(this.userForm.value.open_time, ['h:mm A']).format('mm');

    op_time.setUTCHours(parseInt(o));
    op_time.setUTCMinutes(parseInt(o2));

    this.userForm.value.open_time = op_time.toISOString();

    let cl_time = new Date(this.userForm.value.jobDate);
    let c = moment(this.userForm.value.close_time, ['h:mm A']).format('HH');
    let c2 = moment(this.userForm.value.close_time, ['h:mm A']).format('mm');

    cl_time.setUTCHours(parseInt(c));
    cl_time.setUTCMinutes(parseInt(c2));

    this.userForm.value.close_time = cl_time.toISOString();

    if (this.privateJob) {
      this.service.privatejob(this.userForm.value).subscribe(
        (data) => {
          console.log('privatejob: ', data);
          this.toastr.success((<any>data)['message']);
          this.userFormSubmitted = false;
          this.userForm.reset();
          this.router.navigate(['/public-job-list']);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.service.publicjob(this.userForm.value).subscribe(
        (data) => {
          console.log('publicjob: ', data);
          this.toastr.success((<any>data)['message']);
          this.userFormSubmitted = false;
          this.userForm.reset();
          this.router.navigate(['/public-job-list']);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
