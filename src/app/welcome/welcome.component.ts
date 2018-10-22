import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Store } from '@ngrx/store';
import { Exercise } from '../training/exercise.model';
import { Parties } from '../training/parties.model';
import { TrainingService } from '../training/training.service';
import {Participants, ParticipantList} from '../training/participants.model';
import * as fromTraining from '../training/training.reducer';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, AfterViewInit {

  displayedColumns = ['index', 'name', 'state'];
  displayedColumns2 = ['index', 'partyName', 'companyName'];
  displayedColumns3 = ['index', 'participantName', 'jurisdiction']
  dataSource = new MatTableDataSource<Exercise>();
  dataSource2 = new MatTableDataSource<Parties>();
  dataSource3 = new MatTableDataSource<ParticipantList>();
  pageIndex = 0;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('paginator3') paginator3: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit() {
    this.store.select(fromTraining.getFinishedExercises).subscribe(
      (exercises: Exercise[]) => {
        this.dataSource.data = exercises;
      }
    );
    
    this.store.select(fromTraining.getAvailableParties).subscribe(
      (parties: Parties[]) => {
        this.dataSource2.data = parties;
      }
    );   

    this.store.select(fromTraining.getAvailableParticipants).subscribe(
      (participants: ParticipantList[]) => {
        console.log("Participants " + JSON.stringify(participants));
        this.dataSource3.data = participants;
      }
    );
    this.trainingService.fetchCompletedOrCancelledExercises();
    this.trainingService.fetchParties();
    this.trainingService.fetchParticipants();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator3;      
    this.dataSource2.paginator = this.paginator2;     
  }

  changePage(evt) {
    
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
