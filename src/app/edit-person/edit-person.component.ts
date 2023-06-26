import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent implements OnInit {
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

  updatePerson() {
    this.personService.updatePerson(this.person.id, this.person).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      error => {
        this.errorMessage = 'Error updating person.';
        console.log('Error updating person:', error);
      }
    );
  }
}
