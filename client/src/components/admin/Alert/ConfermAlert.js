function SweetAlert2(title, showConfirmButton, showCancelButton, confirmButtonText, showCancelButton, icon) {
    return fireAlert = () => {
        Swal.fire({
            title: 'I am Sweet Alert 2.',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "OK",
            showCancelButton: "Cancel",
            icon: 'warning'
        }
        ).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                Swal.fire('Nice to meet you', '', 'success');

            } else
                Swal.fire(' Cancelled', '', 'error')

        })
    }
}