import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-delete-person',
  templateUrl: './delete-person.component.html',
  styleUrls: ['./delete-person.component.css']
})
export class DeletePersonComponent implements OnInit {
  person: any;
  errorMessage: string='';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personService: PersonService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.personService.getPerson(id).subscribe(
        data => {
          this.person = data;
        },
        error => {
          console.log('Error retrieving person:', error);
        }
      );
    });
  }

  deletePerson() {
    this.personService.deletePerson(this.person.id).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      error => {
        this.errorMessage = 'Error deleting person.';
        console.log('Error deleting person:', error);
      }
    );
  }
}
