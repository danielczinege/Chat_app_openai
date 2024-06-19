import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatSignalsComponent } from './chat-signals.component';

describe('ChatSignalsComponent', () => {
  let component: ChatSignalsComponent;
  let fixture: ComponentFixture<ChatSignalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatSignalsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatSignalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
