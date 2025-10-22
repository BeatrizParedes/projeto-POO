import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-feedback-livro',
  templateUrl: './feedback-livro.component.html',
  styleUrls: ['./feedback-livro.component.css']
})
export class FeedbackLivroComponent implements OnInit {

 
  livro = {
    titulo: 'FLORES PARA ALGERNON',
    preco: '48,50',
    imagemUrl: 'caminho/para/image_0f4a6a.png' 
  };

  
  estrelas = [1, 2, 3, 4, 5];
  ratingSelecionado: number | null = null;
  ratingEmHover: number | null = null;

  feedbackForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    
    this.feedbackForm = this.fb.group({
      rating: [null, [Validators.required, Validators.min(1)]], 
      comentario: ['', Validators.maxLength(500)] 
    });
  }

  


  setRating(star: number): void {
    this.ratingSelecionado = star;
    this.feedbackForm.get('rating')?.setValue(star);
  }

  
  onStarHover(star: number): void {
    this.ratingEmHover = star;
  }

  
  onStarLeave(): void {
    this.ratingEmHover = null;
  }

  
  isStarFilled(star: number): boolean {
    const ratingAtual = this.ratingEmHover !== null ? this.ratingEmHover : this.ratingSelecionado;
    return star <= (ratingAtual ?? 0);
  }

 
  onSubmit(): void {
    if (this.feedbackForm.valid) {
      console.log('Feedback Enviado:', this.feedbackForm.value);
      alert(`Obrigado pelo seu feedback! Rating: ${this.feedbackForm.value.rating}`);
      
    } else {
      console.log('Formulário inválido. Verifique o rating.');
      
      this.feedbackForm.markAllAsTouched();
    }
  }

  
  get ratingControl() {
    return this.feedbackForm.get('rating');
  }
}