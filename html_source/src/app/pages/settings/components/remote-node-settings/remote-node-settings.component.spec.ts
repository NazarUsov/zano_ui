import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteNodeSettingsComponent } from './remote-node-settings.component';

describe('RemoteNodeSettingsComponent', () => {
  let component: RemoteNodeSettingsComponent;
  let fixture: ComponentFixture<RemoteNodeSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RemoteNodeSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoteNodeSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
