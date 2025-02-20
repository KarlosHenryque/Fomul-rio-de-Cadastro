class ValidaFormulario {
  constructor() {
    this.formulario = document.querySelector('.formulario');
    this.eventos();
  }

  eventos() {
    this.formulario.addEventListener('submit', (e) => {
      this.handleSubmit(e);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.limpaErros(); // Limpa erros antes de validar

    const camposValidos = this.camposSaoValidos();
    const senhasValidas = this.senhasSaoValidas();

    if (camposValidos && senhasValidas) {
      alert('Formulário enviado com sucesso!');
      this.formulario.submit();
    }
  }

  limpaErros() {
    for (let errorText of this.formulario.querySelectorAll('.error-text')) {
      errorText.remove();
    }
    for (let campo of this.formulario.querySelectorAll('.validar')) {
      campo.classList.remove('campo-invalido');
    }
  }

  senhasSaoValidas() {
    let valid = true;

    const senha = this.formulario.querySelector('.senha');
    const repetirSenha = this.formulario.querySelector('.repetir_senha');

    if (senha.value !== repetirSenha.value) {
      valid = false;
      this.criaErro(senha, 'As senhas devem ser iguais.');
      this.criaErro(repetirSenha, 'As senhas devem ser iguais.');
    }

    if (senha.value.length < 6 || senha.value.length > 12) {
      valid = false;
      this.criaErro(senha, 'A senha precisa ter entre 6 e 12 caracteres.');
    }

    return valid;
  }

  camposSaoValidos() {
    let valid = true;

    for (let campo of this.formulario.querySelectorAll('.validar')) {
      const label = campo.previousElementSibling.innerText;

      if (!campo.value.trim()) {
        this.criaErro(campo, `O campo "${label}" não pode estar vazio.`);
        valid = false;
      }

      if (campo.classList.contains('cpf') && !this.validaCPF(campo)) valid = false;
      if (campo.classList.contains('usuario') && !this.validaUsuario(campo)) valid = false;
    }

    return valid;
  }

  validaUsuario(campo) {
    const usuario = campo.value;
    let valid = true;

    if (usuario.length < 3 || usuario.length > 12) {
      this.criaErro(campo, 'O usuário deve ter entre 3 e 12 caracteres.');
      valid = false;
    }

    if (!/^[a-zA-Z0-9]+$/.test(usuario)) {
      this.criaErro(campo, 'O usuário deve conter apenas letras e números.');
      valid = false;
    }

    return valid;
  }

  validaCPF(campo) {
    if (typeof ValidaCPF === 'function') {
      const cpf = new ValidaCPF(campo.value);
      if (!cpf.valida()) {
        this.criaErro(campo, 'CPF inválido.');
        return false;
      }
      return true;
    } else {
      this.criaErro(campo, 'Validação de CPF não disponível.');
      return false;
    }
  }

  criaErro(campo, msg) {
    const div = document.createElement('div');
    div.innerHTML = msg;
    div.classList.add('error-text');
    campo.insertAdjacentElement('afterend', div);
    campo.classList.add('campo-invalido'); // Adiciona efeito visual de erro
  }
}

const valida = new ValidaFormulario();
