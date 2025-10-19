import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-feedback-livro',
  templateUrl: './feedback-livro.component.html',
  styleUrls: ['./feedback-livro.component.css']
})
export class FeedbackLivroComponent implements OnInit {

  // Dados estáticos do livro (poderiam vir de um serviço)
  livro = {
    titulo: 'FLORES PARA ALGERNON',
    preco: '48,50',
    imagemUrl: 'caminho/para/image_0f4a6a.png' // Substitua pelo caminho real da imagem
  };

  // Array para renderizar as estrelas (5 estrelas)
  estrelas = [1, 2, 3, 4, 5];
  ratingSelecionado: number | null = null;
  ratingEmHover: number | null = null;

  feedbackForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Inicializa o formulário reativo
    this.feedbackForm = this.fb.group({
      rating: [null, [Validators.required, Validators.min(1)]], // Rating é obrigatório
      comentario: ['', Validators.maxLength(500)] // Comentário opcional
    });
  }

  // --- Lógica das Estrelas ---

  // Define o valor da avaliação e atualiza o FormControl
  setRating(star: number): void {
    this.ratingSelecionado = star;
    this.feedbackForm.get('rating')?.setValue(star);
  }

  // Lógica de hover para pré-visualizar o rating
  onStarHover(star: number): void {
    this.ratingEmHover = star;
  }

  // Lógica para sair do hover (volta para o rating selecionado)
  onStarLeave(): void {
    this.ratingEmHover = null;
  }

  // Verifica se a estrela deve estar 'cheia'
  isStarFilled(star: number): boolean {
    const ratingAtual = this.ratingEmHover !== null ? this.ratingEmHover : this.ratingSelecionado;
    return star <= (ratingAtual ?? 0);
  }

  // --- Submissão do Formulário ---

  onSubmit(): void {
    if (this.feedbackForm.valid) {
      console.log('Feedback Enviado:', this.feedbackForm.value);
      alert(`Obrigado pelo seu feedback! Rating: ${this.feedbackForm.value.rating}`);
      // Aqui você enviaria os dados para um backend (API)
      // Ex: this.feedbackService.enviarFeedback(this.feedbackForm.value).subscribe(...);
    } else {
      console.log('Formulário inválido. Verifique o rating.');
      // Marca todos os campos como "touched" para exibir erros de validação
      this.feedbackForm.markAllAsTouched();
    }
  }

  // Getter para facilitar a validação no template (opcional)
  get ratingControl() {
    return this.feedbackForm.get('rating');
  }
}