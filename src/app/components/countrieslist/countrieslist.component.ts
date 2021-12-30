import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
import { CountriesService } from "../../services/countries.service";
import { DarkModeService } from 'angular-dark-mode';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { Router, ActivatedRoute, Params, ParamMap, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-countrieslist',
  templateUrl: './countrieslist.component.html',
  styleUrls: ['./countrieslist.component.scss']
})
export class CountrieslistComponent implements OnInit {

  filter = new FormControl;
  region = new FormControl;
  datacountries:any;  
  finalcountries: any[] = [];
  breakpoint: number;
  countriesrow:number = 4;
  darkMode$ = this.darkModeService.darkMode$;

  constructor(

    private services:CountriesService,
    private darkModeService: DarkModeService,
    private router: Router,

  ) { }

   ngOnInit(){    

    this.loadcountries();

  }

  loadcountries(){
    this.services.getallcountries().subscribe((response) =>{
      
      this.initSize();
      this.datacountries = response;
      this.finalcountries=this.datacountries;
    },error =>{      
      
    });
  }

  initSize(){
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;
    if(window.innerWidth > 1690){
      this.countriesrow = 4;
    }else if(window.innerWidth <= 1690 && window.innerWidth >=1422){
      this.countriesrow = 3;
    }else if(window.innerWidth <= 1421 && window.innerWidth >=1141){  
      this.countriesrow = 2;
    }else{  
      this.countriesrow = 1;
    }
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 6;
    if(window.innerWidth > 1690){
      this.countriesrow = 4;
    }else if(window.innerWidth <= 1690 && window.innerWidth >=1422){
      this.countriesrow = 3;
    }else if(window.innerWidth <= 1421 && window.innerWidth >=1141){  
      this.countriesrow = 2;
    }else{  
      this.countriesrow = 1;
    }

  }

  countriesbyregion(){
    this.filter.setValue("");
    this.services.countriesbyregion(this.region.value).subscribe((response) =>{      
      this.datacountries = response;
      this.finalcountries=this.datacountries;
    },error =>{      
      
    });
  }

  filtercountries(){
    if(this.filter.value != "" &&  this.filter.value != null){
      const filterValue = this.filter.value.toLowerCase();      
      this.finalcountries = this.datacountries.filter(country => country.name.official.toLowerCase().includes(filterValue));        
    }else{  
      this.finalcountries = this.datacountries;        
    }
  }

  detail(code:string){
    
    this.router.navigate(['/detallepais',code]);
  }

}
