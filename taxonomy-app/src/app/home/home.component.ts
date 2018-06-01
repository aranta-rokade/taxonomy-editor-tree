import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ViewChild } from '@angular/core'
import { TreeComponent, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';
import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public editTerm: string;
  public folderCount: number = 0;
  public nodeCount: number = 0;
  public operation:number = 0;
  nodes = [
    {
      name: 'New York',
      children: [
        { name: 'Manhattan' },
        { name: 'New Jersey' }
      ]
    },
    {
      name: 'Virgnia',
      children: [
        { name: 'Herndon' },
        {
          name: 'Fairfax',
          children: [
            { name: 'Main Street' },
            { name: 'Jermantown' },
            { name: 'George Mason University' }
          ]
        }
      ]
    }
  ];
  options: ITreeOptions = {
    displayField: 'name',
    isExpandedField: 'expanded',
    idField: 'id',
    hasChildrenField: 'children',
    actionMapping: {
      mouse: {
        dblClick: (tree, node, $event) => {
          if (node.hasChildren) TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
        }
      }
    },
    animateExpand: true,
    animateSpeed: 30,
    animateAcceleration: 1.2
  }

  constructor(private http: Http) { }

  ngOnInit() {
    this.getCount(this.nodes);
  }

  @ViewChild(TreeComponent)
  private tree: TreeComponent;

  actionClick(node, tree, term, op){
    var inputs = document.getElementsByClassName("actionPane");
    for (var i = 0; i < inputs.length; i++) {
      //inputs[i].style.visibility = "hidden";
    } 
    var wrapper = document.getElementsByClassName("node-content-wrapper");
    for (var i = 0; i < wrapper.length; i++) {
      //wrapper[i].style.height = "20px";
    }
    document.getElementById(node.data.id).style.visibility = "visible";
    if(op == 1)
      term.value = node.data.name;
    else 
    term.value = "";
    this.operation = op;
    document.getElementById('content'+node.data.id).style.height="50px";
  }

  okClick(node, tree, term) {
    switch(this.operation){
      case 1:
        this.editNode(node, tree, term)
        break;
      case 2:
        this.addNode(node, tree, term)
        break;
      case 3:
        this.addCategory(node, tree, term)
        break;
      default: alert("Invalid Action");
    } 
    var inputs = document.getElementsByClassName("actionPane");
    for (var i = 0; i < inputs.length; i++) {
      //inputs[i].style.visibility = "hidden";
    }
    var wrapper = document.getElementsByClassName("node-content-wrapper");
    for (var i = 0; i < wrapper.length; i++) {
      //wrapper[i].style.height = "20px";
    }
  }

  addNode(node, tree, term) {
    if(term.value==undefined || term.value==null || term.value==""){
      alert("Enter a valid value");
      return;
    }
    node.data.children.push({ name: term.value });
    this.tree.treeModel.update();
    this.nodeCount++;
    alert('Term added: ' + term.value);
    term.value="";
  }

  addCategory(node, tree, term) {
    if(term.value==undefined || term.value==null || term.value==""){
      alert("Enter a valid value");
      return;
    }
    node.data.children.push({ name: term.value, children: [] });
    this.tree.treeModel.update();
    alert('Category added: ' + term.value);
    this.folderCount++;
    term.value="";
  }

  editNode(node, tree, term) {
    if(term.value==undefined || term.value==null || term.value==""){
      alert("Enter a valid value");
      return;
    }
    node.data.name = term.value;
    this.tree.treeModel.update();
    alert('Term updated to: ' + term.value);
    term.value="";
  }

  deleteNode(node, tree) {
    if(confirm("Are you sure to delete "+node.data.name)) {
      let parentNode = node.realParent ? node.realParent : node.treeModel.virtualRoot;
      _.remove(parentNode.data.children, function (child) {
        return child === node.data;
      });
      tree.treeModel.update();
      if (node.parent.data.children.length === 0) {
        node.parent.data.hasChildren = false;
      }
      this.getNewCountRecurse(node); 
    }
  }

  getCount(node) {
    node.forEach(element => {
      this.getCountRecurse(element);
    });
  }

  getCountRecurse(node) {
    if(node.children!=undefined) {
      this.folderCount++;
      node.children.forEach(child => {
        this.getCountRecurse(child);
      });
    }
    else
      this.nodeCount++;
  }

  getNewCountRecurse(node){
    if(node.children!=undefined) {
      this.folderCount--;
      node.children.forEach(child => {
        this.getNewCountRecurse(child);
      });
    }
    else
      this.nodeCount--;
  }
}
