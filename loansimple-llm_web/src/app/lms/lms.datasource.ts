import {DataSource} from '@angular/cdk/table';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {LmsService} from './lms.service';

export class LmsDataSource extends DataSource<any> {
    // Private
    private lmsSubject = new BehaviorSubject<any[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public lmsLengthSubject = 0;
    public isLoading = false;

    /**
     * Constructor
     *
     * @param lmsService: LmsService
     */
    constructor(
        private lmsService: LmsService,
    ) {
        super();
    }

    connect(): Observable<any[]> {
        return this.lmsSubject.asObservable();
    }

    /**
     * Disconnect
     */
    disconnect(): void {
        this.lmsSubject.complete();
        this.loadingSubject.complete();
    }

    loadLmsData(url, page = 0, pageSize, search){
        this.loadingSubject.next(true);
        this.isLoading = true;
        page += 1;
          return  this.lmsService.getNextPageData(url, page, pageSize, search);
    }
}