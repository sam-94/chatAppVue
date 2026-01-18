import Swal from 'sweetalert2'

export const confirmLogout = () => {
  return Swal.fire({
    title: 'Logout?',
    text: 'Are you sure you want to logout?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, logout',
    cancelButtonText: 'Cancel',

    background: '#0f172a',     // dark bg
    color: '#e5e7eb',          // text color

    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#334155',

    customClass: {
      popup: 'swal-dark',
      title: 'swal-title',
      htmlContainer: 'swal-text',
    }
  })
}