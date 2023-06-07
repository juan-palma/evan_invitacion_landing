// PUede cambiar esta URL por la direccion donde se enviaran los datos del formulario. 
// se espera una respuesta JSON con un valor llamado statur en ok ejemplo:
//json.status == 'ok';
const serverUrlReuest = 'server/form.php';




const idagl = {};
idagl.elementos = {};
const el = idagl.elementos;



function iniciar() {
	if(htmlSeccion == "home"){
		const urlREgistro = "registro.html";
		const btnRegistro = document.querySelectorAll('.btnRegistro');

		btnRegistro.forEach(el => {
			el.addEventListener('click', (e) => {
				e.stopPropagation();
				window.location.href = urlREgistro;
			})
		});
	}

	if(htmlSeccion == "registro"){
		let fPv = "";
		let enviandoForm = false;
		function formulario(e){
			e.preventDefault();
			if(enviandoForm){ return; }

			function enviado(j){
				el.fPv.clear();
				pop('Gracias por contactarnos, tu correo fue enviado y en breve me pondre en contacto contigo.', 'ok');
				enviandoForm = false;
			}

			function error(j){
				pop('No se puedo enviar el correo, intentolo mas tarde.', 'error');
				enviandoForm = false;
			}

			if(el.fPv.validar()){
				const formData = new FormData(el.form);
				enviandoForm = true;
				request(serverUrlReuest, formData, enviado, error);
			} else{
				pop('El formulario tiene errores que se deben corregir.', 'alert');
			}
		}

		el.form = document.getElementById('formReg');
		el.form.addEventListener('submit', formulario);
		el.fPv = new ValidarForm();
		el.fPv.form = el.form;
		el.fPv.run();

	}
}




// iniciar la solicitud de los modulos y la ejecucion inicial del sistema.
//importamos los archivos y librerias necesarios
requirejs.config({
	baseUrl: "assets/js/owner",
	paths: { a: "../animaciones", l: "../librerias", n: "/node_modules"},
});
requirejs(["l/modernizr", "precarga", "validaciones", "alertas", "peticiones"], iniciar);

