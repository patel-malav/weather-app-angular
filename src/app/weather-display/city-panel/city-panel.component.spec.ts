import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityPanelComponent } from './city-panel.component';

describe('CityPanelComponent', () => {
  let component: CityPanelComponent;
  let fixture: ComponentFixture<CityPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
