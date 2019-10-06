document.addEventListener('DOMContentLoaded', function() {
	// activate sidebar nav
	var elems = document.querySelectorAll('.sidenav');
	M.Sidenav.init(elems);
	loadNav();

	function loadNav() {
		var xhtpp = new XMLHttpRequest();
		xhtpp.onreadystatechange = function() {
			if (this.readyState == 4) {
				if (this.status != 200) return;

				// memuat daftar tautan menu
				document.querySelectorAll('.topnav, .sidenav').forEach(function(elm) {
					elm.innerHTML = xhtpp.responseText;
				});

				// daftarkan event listener untuk setiap tautan menu
				document.querySelectorAll('.sidenav a, .topnav a').forEach(function(elm) {
					elm.addEventListener('click', function(event) {
						// Tutup sidenav
						var sidenav = document.querySelector('.sidenav');
						M.Sidenav.getInstance(sidenav).close();

						// Memuat konten halaman yang di panggil
						page = event.target.getAttribute('href').substr(1);
						loadPage(page);
					});
				});
			}
		};

		xhtpp.open('GET', 'nav.html', true);
		xhtpp.send();
	}

	// Load page content
	var page = window.location.hash.substr(1);
	if (page == '') page = 'home';
	loadPage(page);

	function loadPage(page) {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4) {
				var content = document.querySelector('#body-content');
				if (this.status == 200) {
					content.innerHTML = xhttp.responseText;
				} else if (this.status == 404) {
					content.innerHTML = '<p>Halaman yang dicari tidak ditemukan</p>';
				} else {
					content.innerHTML = '<p>Maaf.. halaman tidak dapat diakses</p>';
				}
			}
		};
		xhttp.open('GET', 'pages/' + page + '.html', true);
		xhttp.send();
	}
});
