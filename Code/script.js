const preload = document.getElementById("preloader");
window.addEventListener("load", () => {
    setTimeout(() => {preload.style.display = "none";
        
        Swal.fire({
            icon: 'info',
            title: 'Hi, Welcome 👋',
            text: '',
            confirmButtonText: 'Let’s Go 🚀',
            iconColor: 'navy',
            confirmButtonColor: 'navy',
            background: 'black',
            color: 'navy'
          })
    }, 2000)
})