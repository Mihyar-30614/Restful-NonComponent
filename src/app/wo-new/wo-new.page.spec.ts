import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WONEWPage } from './wo-new.page';

describe('WONEWPage', () => {
  let component: WONEWPage;
  let fixture: ComponentFixture<WONEWPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WONEWPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WONEWPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
