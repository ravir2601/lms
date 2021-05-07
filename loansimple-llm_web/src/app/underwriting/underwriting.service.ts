import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpManagerService } from '../services/http-manager.service';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UnderwritingService {
    // applicationRoot = 'https://appv2.loansimple.in/api/v2/los/applications/';
    applicationRoot = environment.api_host + '/api/v2/los/applications/';
    leadRoot = environment.api_host + '/api/v2/crm/leads/';
    routeParams = {};

    // 7163/summary/

    constructor(
        private httpManagerService: HttpManagerService,
        private router: Router,
        private route: ActivatedRoute,
    ) {

    }

    getApplication(id): Observable<any> {
        return this.httpManagerService.get(this.applicationRoot + id + '/?expand=business.primary_person.person,primary_bank_statement');
    }

    getSummary(id): Observable<any> {
        return this.httpManagerService.get(this.applicationRoot + id + '/summary/');
    }

    getKarzaData(leadId): Observable<any> {
        const keys =  'lead_mailing_address,' +
            'lead_registered_address,' +
            'lead_permanent_address,' +

            'karza_aadhar_name_match_percentage,' +
            'karza_aadhar_address,' +
            'karza_aadhar_address_match_percentage,' +
            'karza_lead_pan_ocr_info,' +
            'karza_lead_selfie_pan_face_match_info,' +
            'karza_lead_selfie_aadhar_face_match_info,' +
            'karza_lead_pan_info,' +

            'cibil_mailing_address,' +
            'cibil_registered_address,' +
            'cibil_permanent_address,' +
            'cibil_aadhar_address_match_percentage,' +

            'aadhar_Aadhaar_Back_lead_pan_ocr_info' +
            'aadhar_Aadhaar_Front_Bottom_lead_pan_ocr_info' +
            'aadhar_Aadhaar_Front_Top_lead_pan_ocr_info';
        return this.httpManagerService.get(this.leadRoot + leadId + '/extra/?keys=' + keys);
    }

    karzaVerification(leadId, action): Observable<any> {
        return this.httpManagerService.put(this.leadRoot + leadId + '/verify/?raise_error=true&latest=true', {
            action
        });
    }

}
