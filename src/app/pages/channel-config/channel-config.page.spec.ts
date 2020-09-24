import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChannelConfigPage } from './channel-config.page';

describe('ChannelConfigPage', () => {
  let component: ChannelConfigPage;
  let fixture: ComponentFixture<ChannelConfigPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelConfigPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChannelConfigPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
