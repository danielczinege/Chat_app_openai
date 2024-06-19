import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageSignalsComponent } from './message-signals.component';

describe('MessageSignalsComponent', () => {
  let component: MessageSignalsComponent;
  let fixture: ComponentFixture<MessageSignalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageSignalsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageSignalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
