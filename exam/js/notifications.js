/* eslint-disable no-unused-vars */

function showNotification(message, type = 'info') {
    const area = document.getElementById('notifications-area');
    if (!area) return;

    const toastId = `toast-${Date.now()}`;
    const icons = { success: 'bi-check-circle-fill', danger: 'bi-x-circle-fill', warning: 'bi-exclamation-triangle-fill', info: 'bi-info-circle-fill' };

    area.insertAdjacentHTML('beforeend', `
        <div id="${toastId}" class="toast notification-toast align-items-center text-bg-${type} border-0 mb-2"
             role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="5000">
            <div class="d-flex">
                <div class="toast-body d-flex align-items-center gap-2">
                    <i class="bi ${icons[type] || icons.info}"></i>${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `);

    const toastEl = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
    toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
}
