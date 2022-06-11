import {Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoriaService} from '../../../api/services/categoria.service';
import {Categoria} from '../../../api/models/categoria';
import {DipendenteInsert} from '../../../api/models/dipendente-insert';
import {DipendenteService} from '../../../api/services/dipendente.service';
import {DipendenteUpdate} from '../../../api/models/dipendente-update';
import {AnagraficaAutocomplete} from '../../../api/models/anagrafica-autocomplete';
import {debounceTime, distinctUntilChanged, startWith, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AnagraficaService} from '../../../api/services/anagrafica.service';


@Component({
  selector: 'app-dipendente-edit',
  templateUrl: './dipendente-edit.component.html',
  styleUrls: ['./dipendente-edit.component.css']
})
export class DipendenteEditComponent implements OnInit, OnChanges {

  formGroup: FormGroup = this.fb.group({
    dataInizio:  [undefined, Validators.required],
    dataFine:  [undefined],
    idCategoria:  [undefined, Validators.required],
    link: [undefined, Validators.required]
  });
  categoriaList: Categoria[] = [];

  @Input()
  enteId: number;
  @Input()
  dipendenteId: number;

  @Output()
  done = new EventEmitter<boolean>();

  dipIns: DipendenteInsert = new DipendenteInsert();
  dipEdi: DipendenteUpdate = new DipendenteUpdate();
  isEdit: boolean = false;
  anagraficaOptions: Observable<AnagraficaAutocomplete[]>;



  constructor(private fb: FormBuilder, private categoriaService: CategoriaService, private dipendenteService: DipendenteService,
              private anagraficaService: AnagraficaService) { }

  ngOnInit(): void {

    this.categoriaService.getAllModel().subscribe(
      value => this.categoriaList = value
    );

    if (!this.isEdit) {
      this.anagraficaOptions = this.formGroup.get('idAnagrafica').valueChanges
        .pipe(
          startWith(''),
          debounceTime(400),
          distinctUntilChanged(),
          switchMap(val => {
            return this.anagraficaService.getAnagraficaAutocomplete(val);
          })
        );
    }


    if (this.isEdit){
      this.dipIns = new DipendenteInsert();
      this.formGroup.patchValue(this.dipIns);
    }


  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isEdit = this.dipendenteId != null;
    if (changes.hasOwnProperty('dipendenteId') && this.isEdit) {
      this.dipendenteService.getDipendente4Edit(this.dipendenteId).subscribe(
        value => {
          this.dipEdi = value;
          if (this.formGroup.contains('idAnagrafica')) { this.formGroup.removeControl('idAnagrafica'); }
          this.formGroup.patchValue(this.dipEdi);
        }
      );
    }else{
      this.dipIns = new DipendenteInsert();
      if (!this.formGroup.contains('idAnagrafica')) {
        this.formGroup.addControl('idAnagrafica', new FormControl(undefined, Validators.required));
      }
      this.formGroup.patchValue(this.dipIns);
    }
  }

  onSubmit() {
    console.warn(this.formGroup.value);
    // stop here if form is invalid
    if (this.formGroup.invalid) {
      return;
    }
    if (this.isEdit) {
      this.dipendenteService.update(this.enteId, this.dipendenteId, this.formGroup.value).subscribe(
        // informo tabella della modifica
        value => {
          this.done.emit(true);
        }
      );
    } else {
      this.formGroup.get('idAnagrafica').setValue(this.formGroup.get('idAnagrafica').value.id);
      this.dipendenteService.insert(this.enteId, this.formGroup.value).subscribe(
        // informo tabella della modifica
        value => {
          this.done.emit(true);
        }
      );
    }



  }


  cancel() {
    // informo tabella della NON modifica
    this.done.emit(false);
  }

  displayFn(user: AnagraficaAutocomplete): string {
    return user && user.descrizione ? user.descrizione : '';
  }
}
