// yıl
document.getElementById('year').textContent = new Date().getFullYear();

// koordinat okuyucu (blueprint imzası) — sadece geniş ekranlarda göster
const readout = document.getElementById('coordReadout');
const heroSection = document.querySelector('.hero');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (readout && window.innerWidth > 900 && !reduceMotion) {
  readout.style.display = 'block';
  heroSection.addEventListener('mousemove', (e) => {
    const x = Math.round(e.clientX).toString().padStart(3, '0');
    const y = Math.round(e.clientY).toString().padStart(3, '0');
    readout.textContent = `X ${x}  Y ${y}`;
  });
}

// scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// skill bar animasyonu
const bars = document.querySelectorAll('.bar i');
const barIo = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const val = entry.target.getAttribute('data-value');
      entry.target.style.width = val + '%';
      barIo.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
bars.forEach(b => barIo.observe(b));

// form gönderimi — veritabanı / backend gerektirmez.
// Form alanlarından bir mailto: bağlantısı oluşturup kullanıcının
// kendi e-posta istemcisini (Gmail, Outlook, Mail vb.) önceden
// doldurulmuş şekilde açar. Mesaj doğrudan sizin adresinize gider.
const CONTACT_EMAIL = 'merhaba@example.com'; // kendi e-posta adresinizle değiştirin

const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  const subject = `Portfolyo İletişim — ${name}`;
  const body =
    `Ad Soyad: ${name}\n` +
    `E-posta: ${email}\n\n` +
    `Mesaj:\n${message}`;

  const mailtoLink =
    `mailto:${CONTACT_EMAIL}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  // kullanıcının varsayılan e-posta istemcisini açar
  window.location.href = mailtoLink;

  note.textContent = 'E-posta uygulamanız açılıyor — göndermeden önce kontrol edin.';
  setTimeout(() => note.textContent = '', 5000);
});
