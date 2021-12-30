import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { CountriesService } from "../../services/countries.service";
import { Router, ActivatedRoute, Params, ParamMap, NavigationEnd } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-countriedetail',
  templateUrl: './countriedetail.component.html',
  styleUrls: ['./countriedetail.component.scss']
})
export class CountriedetailComponent implements OnInit {


  datapais:any = null;
  breakpoint: number;
  row:number;
  altura:string = "510px";
  errors:any = null;


  constructor(
    private services:CountriesService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog

  ) { }

  ngOnInit(): void {
    this.errors = null;
    this.route.paramMap.subscribe((params: ParamMap) => {      
      let codecountry = params.get('idpais');
      this.services.countrybycode(codecountry).subscribe((response:any) =>{
        response.forEach((country:any) => {
          let datanativename:any[] = [];
          let languages:any[] = [];
          for (let data in country.name.nativeName){            
            datanativename.push(country.name.nativeName[data]);
          }
          for (let datalang in country.languages){            
            languages.push(country.languages[datalang]);
          }
          country.nombresnativos = datanativename;  
          country.idiomas = languages;        
        });
        this.datapais=response;        
        this.initSize();
      },error =>{      
        this.errors = error;
        console.log(this.errors);
        this.openDialog();
      });

    });
  }

  initSize(){
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;
    if(window.innerWidth >= 878){
      this.row = 2;
      this.altura = "510px";
    }else{
      this.row = 1;
      this.altura = "250px";
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 6;
    if(window.innerWidth >= 878){
      this.row = 2;
      this.altura = "510px";
    }else{
      this.row = 1;
      this.altura = "250px";
    }
  }

  back(){
    this.router.navigate(['/paises']);
  }

  detail(code:string){    
    this.router.navigate(['/detallepais',code]);
  }

  openDialog() {
    const dialogRef = this.dialog.open(dialogerror,{
      width: '38.4rem',
      height: '18.4rem',
      data: { errors: this.errors }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/paises']);
    });
    
  }

}


@Component({
  selector: 'dialog',
  templateUrl: './dialog-template.html',
  styleUrls: ['./countriedetail.component.scss']
})
export class dialogerror implements OnInit {


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit() {  
    console.log(this.data.errors);
  }

}
