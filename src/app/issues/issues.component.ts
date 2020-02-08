import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';

export interface IIssue {
  id: string;
  name: string;
}

const ISSUES_DATA: IIssue[] = [
  {
    id: 'MS-34',
    name: 'Export UI'
  },
  {
    id: 'MS-35',
    name: 'Sort data results'
  },
  {
    id: 'MS-36',
    name: 'New kard'
  },
  {
    id: 'MS-37',
    name: 'Ui design'
  },
  {
    id: 'MS-38',
    name: 'List sorting'
  }
];

@Component({
  selector: 'bg-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent {

  displayedColumns: string[] = ['select', 'id', 'name'];
  dataSource = new MatTableDataSource<IIssue>(ISSUES_DATA);
  selection = new SelectionModel<IIssue>(true, []);
  searchForm = new FormGroup({
    search: new FormControl('')
  });

  constructor(
    private router: Router
  ) {}

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: IIssue): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
  }

  goToTask(_taskId: string): void {
    this.router.navigateByUrl('/watch-ticket');
  }

  searchTasks(): void {
    this.dataSource.filter = this.searchForm.value.search || '';
    this.dataSource._filterData(ISSUES_DATA)
  }

  resetFilter(): void {
    this.searchForm.reset();
    this.searchTasks();
  }

}
