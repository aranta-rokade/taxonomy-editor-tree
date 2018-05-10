import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { TreeModel, NodeEvent } from 'ng2-tree';  
@Component({
  selector: 'app-home', 
  templateUrl: './home.component.html',
   styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  public tree: TreeModel;
  private header = new Headers({'Content-Type':'application/json'});

  constructor(private http: Http) { }
  
  fetchData = function(){
    this.http.get('http://localhost:4200/assets/mock-data/terms.json').subscribe(
      (res: Response) => {
        this.tree = res.json().terms as TreeModel;
        console.log(this.tree);
      }
    )
  }
  public handleSelected(e: NodeEvent): void {
    console.log(e, 'Selected');
  }

  public handleRemoved(e: NodeEvent): void {
    console.log(e, 'Removed');
  }

  public handleRenamed(e: NodeEvent): void {
    console.log(e, 'Renamed');
  }
  public handleCreated(e: NodeEvent): void {
    console.log(e, 'Created');
  }

  ngOnInit() {
    this.fetchData();
  }

}
