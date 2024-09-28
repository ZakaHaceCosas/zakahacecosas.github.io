document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById('discordModal') as HTMLDialogElement | null;
    const openButton = document.getElementById('discord');
    const closeButton = document.getElementById('noDiscord');

    if (!openButton || !closeButton || !modal) {
        console.error("Some item is not present in the HTML...");
    } else {
        openButton.addEventListener('click', () => {
            modal.showModal();
        });

        closeButton.addEventListener('click', () => {
            modal.close();
        });
    }
})