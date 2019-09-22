import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';
import {UserInSession} from '../../model/user-in-session';
import {ADMIN_ITEMS} from '../../constants/constants';
import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';

@Component(
    {
        templateUrl: './adminpage.component.html',
        styles: [`
            :host ::ng-deep button {
                margin-right: .25em;
            }

            :host ::ng-deep .ui-message,
            :host ::ng-deep .ui-inputtext {
                margin-right: .25em;
            }
        `],
        providers: [MessageService]
    }
)
export class AdminpageComponent {

    items: any[] = [];
    public utente: UserInSession;

    constructor(private _route: ActivatedRoute,
                public router: Router,
                private authenticationService: AuthenticationService,
                private messageService: MessageService) {
        this.utente = new UserInSession();
        this.authenticationService.getUtente().subscribe(
            utente => {
                if (utente) {
                    console.log('utente: ' + utente.username);
                    this.utente = utente;
                } else {
                    this.utente.username = 'sconosciuto';
                }
            });
        this.items = ADMIN_ITEMS;
    }

    showSuccess() {
        this.messageService.add({severity: 'success', summary: 'Success Message', detail: 'Order submitted'});
    }

    showInfo() {
        this.messageService.add({severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks'});
    }

    showWarn() {
        this.messageService.add({severity: 'warn', summary: 'Warn Message', detail: 'There are unsaved changes'});
    }

    showError() {
        this.messageService.add({severity: 'error', summary: 'Error Message', detail: 'Validation failed'});
    }

    showMultiple() {
        this.messageService.add({severity: 'info', summary: 'Message 1', detail: 'PrimeNG rocks'});
        this.messageService.add({severity: 'info', summary: 'Message 2', detail: 'PrimeUI rocks'});
        this.messageService.add({severity: 'info', summary: 'Message 3', detail: 'PrimeFaces rocks'});
    }

    showViaService() {
        this.messageService.add({severity: 'success', summary: 'Service Message', detail: 'Via MessageService'});
    }

    clear() {
    }
}
