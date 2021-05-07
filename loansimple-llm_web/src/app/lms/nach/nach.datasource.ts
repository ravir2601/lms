import {DataSource} from '@angular/cdk/table';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {NachService} from './nach.service';

export class NachDataSource extends DataSource<any> {
    // Private
    private nachSubject = new BehaviorSubject<any[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public nachLengthSubject = 0;
    public isLoading = false;

    /**
     * Constructor
     *
     * @param nachService: NachService
     */
    constructor(private nachService: NachService) {
        super();
    }

    connect(): Observable<any[]> {
        return this.nachSubject.asObservable();
    }

    /**
     * Disconnect
     */
    disconnect(): void {
        this.nachSubject.complete();
        this.loadingSubject.complete();
    }

    loadNach(url, page = 0, pageSize){
        this.loadingSubject.next(true);
        this.isLoading = true;
        page += 1;
        return  this.nachService.getNach(url, page, pageSize);
    }
    
}