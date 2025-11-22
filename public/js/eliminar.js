// Hacer disponible la función globalmente
// Hacer la función global para que el onclick la encuentre
window.confirmarEliminacion = function(id) {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "No podrás revertir esta acción.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      // Llamada DELETE al backend
        fetch(`/api/heroes/${id}`, { method: 'DELETE' })
      .then(async res => {
        if (!res.ok) throw new Error('Error en la eliminación');
        try {
          return await res.json();   // <-- aquí espera JSON
        } catch {
          return ({});
        }
      })
        .then(() => {
          Swal.fire({
            title: "Eliminado!",
            text: "El superhéroe fue eliminado.",
            icon: "success"
          }).then(() => {
            // Recargar la página para actualizar la lista
            window.location.reload();
          });
        })
        .catch(() => {
          Swal.fire({
            title: "Error",
            text: "No se pudo eliminar el superhéroe.",
            icon: "error"
          });
        });
    }
  });
};
