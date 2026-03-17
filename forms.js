// Contact Form JavaScript


document.getElementById('contactForm1').addEventListener('submit', function (e) {
    e.preventDefault(); // Always prevent real submission

    let valid = true;

    const firstName = document.getElementById('firstName');
    const lastName  = document.getElementById('lastName');
    const email     = document.getElementById('email');
    const message   = document.getElementById('message');

    // Reset errors
    ['firstNameErr','lastNameErr','emailErr','messageErr'].forEach(id => {
        document.getElementById(id).style.display = 'none';
    });

    if (!firstName.value.trim()) {
        document.getElementById('firstNameErr').style.display = 'block';
        valid = false;
    }
    if (!lastName.value.trim()) {
        document.getElementById('lastNameErr').style.display = 'block';
        valid = false;
    }
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        document.getElementById('emailErr').style.display = 'block';
        valid = false;
    }
    if (!message.value.trim()) {
        document.getElementById('messageErr').style.display = 'block';
        valid = false;
    }

    if (valid) {
        // Show success message
        const successMsg = document.getElementById('successMsg');
        successMsg.style.display = 'block';

        // Reset the form fields
        this.reset();

        // Hide success message after 4 seconds
        setTimeout(() => { successMsg.style.display = 'none'; }, 4000);
    }
  });
