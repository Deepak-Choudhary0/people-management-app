import { Component, OnInit } from '@angular/core';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-list-people',
  templateUrl: './list-people.component.html',
  styleUrls: ['./list-people.component.css']
})
export class ListPeopleComponent implements OnInit {
  people: any[]=[];
  errorMessage: string='';

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.personService.getAllPeople().subscribe(
      data => {
        this.people = data;
      },
      error => {
        this.errorMessage = 'Error retrieving people.';
        console.log('Error retrieving people:', error);
      }
    );
  }

  deletePerson(id: number) {
    this.personService.deletePerson(id).subscribe(
      () => {
        this.people = this.people.filter(person => person.id !== id);
      },
      error => {
        this.errorMessage = 'Error deleting person.';
        console.log('Error deleting person:', error);
      }
    );
  }
}
