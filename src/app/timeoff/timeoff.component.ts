import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import * as _moment from 'moment';
import { first } from 'rxjs/operators';
import { AccountService } from '@app/_services/account.service';
import { AlertService } from '@app/_services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
const moment = _moment;
@Component({
    templateUrl: 'timeoff.component.html',
    styleUrls:['./timeoff.component.scss'],
    providers: [DatePipe]
})
export class TimeOffComponent implements OnInit {
    numberOfDays = 1;
    @ViewChild("dateEle") dateEle: ElementRef<any>;
    currentUser: any;
    constructor(private datePipe: DatePipe,
        private accountService: AccountService,
        private alertService: AlertService,
        private route: ActivatedRoute,
        private router: Router,){}

    selectedDateRange = [];
    ngOnInit(): void {
        const today = new Date();
        const todayDate = this.datePipe.transform(new Date(), 'short');
        const tomorrow = today.setDate(today.getDate() + 1);
        const tomorrowDate = this.datePipe.transform(tomorrow, 'short');
        this.selectedDateRange = [`${todayDate}`, `${todayDate}`];
        const currentUser = localStorage.getItem('user');
        if (currentUser) {
            this.currentUser = JSON.parse(currentUser);
        }
    }
    valueChange($event) {
        // $event.stopPropagation();
        if($event.length > 1) {
            const startDate = this.datePipe.transform($event[0], 'short');
            const endDate = this.datePipe.transform($event[1], 'short');
            this.selectedDateRange = [`${startDate}`, `${endDate}`];
           this.numberOfDays = this.findSelectedDays($event);
        }
    }
    sendTimeOff($event) {
        $event.stopPropagation();
        if (this.dateEle) {
            // moment.unix(this.dateEle._value).format('YYYY-MM-DD')
            const selectedDates = this.dateEle['_value'].map(el => {
                const date = el.split(', ');
                console.log(date)
                return date[0];
                });
        
            this.accountService.update(this.currentUser.id, { timeoffRequest: selectedDates, numberOfdays: this.numberOfDays})
                .pipe(first())
                .subscribe({
                    next: () => {
                        this.alertService.success('Applied successfully, your manager will review soon.', { keepAfterRouteChange: true, autoClose: true });
                        this.router.navigate(['../'], { relativeTo: this.route });
                    },
                    error: error => {
                        this.alertService.error(error);
                        // this.loading = false;
                    }
                });
        }

    }

    findSelectedDays(dataObj): any {
       const start = moment(dataObj[0]).format("YYYY/MM/DD");
       const end =  moment(dataObj[1]).format("YYYY/MM/DD");
        const date1 = moment(start);
        const date2 = moment(end);
        return date2.diff(date1, 'days') + 1;

    }

   
}