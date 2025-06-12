import {Component, OnInit} from '@angular/core';
import {AuthService} from '@services/auth.service';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    public activeTabSubject = new BehaviorSubject<string>('ACTIVITY');
    activeTab$ = this.activeTabSubject.asObservable();

    public user;

    constructor(private appService: AuthService) {}

    ngOnInit(): void {
        this.user = this.appService.user;
    }

    setActiveTab(tab: string) {
        this.activeTabSubject.next(tab);
    }

    toggle(tab: string) {
        this.setActiveTab(tab);
    }
}
