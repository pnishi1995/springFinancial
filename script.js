document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.querySelector('tbody');
    const searchInput = document.querySelector('input[type="search"]');
    const sortBySelect = document.querySelector('select');

    let users = []; 

    async function fetchUsers() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            users = data; 
            renderUsers(users); 
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    
    function renderUsers(usersToRender) {
        tableBody.innerHTML = '';

        usersToRender.forEach(user => {
            const row = document.createElement('tr');
            row.classList.add(user.id % 2 === 0 ? 'bg-gray-50' : 'bg-white'); 

            const profileCell = document.createElement('td');
            profileCell.classList.add('px-4', 'py-2');

            const profileContent = `
                <div onclick="redirectToUserDetails(${user.id})"  class="flex items-center">
                    <div class="rounded-full h-10 w-10 bg-gray-200 flex items-center justify-center">
                        <span class="text-gray-600">${user.name.charAt(0)}</span>
                    </div>
                    <div class="ml-2">
                        <p class="font-bold">${user.name}</p>
                        <p class="text-gray-600">${user.email}</p>
                    </div>
                </div>
            `;
            profileCell.innerHTML = profileContent;

            const emailCell = document.createElement('td');
            emailCell.classList.add('px-4', 'py-2', 'hidden', 'lg:table-cell', 'text-right');
            emailCell.textContent = user.email;

            row.appendChild(profileCell);
            row.appendChild(emailCell);

            tableBody.appendChild(row);
        });
    }

    
    function filterUsers(searchTerm) {
        const filteredUsers = users.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        renderUsers(filteredUsers);
    }

   
    function sortUsers(sortBy) {
        let sortedUsers = [...users]; 

        switch (sortBy) {
            case 'name':
                sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'username':
                sortedUsers.sort((a, b) => a.username.localeCompare(b.username));
                break;
            case 'email':
                sortedUsers.sort((a, b) => a.email.localeCompare(b.email));
                break;
            default:
                sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }

        renderUsers(sortedUsers);
    }

    searchInput.addEventListener('input', function (event) {
        filterUsers(event.target.value.trim());
    });

    sortBySelect.addEventListener('change', function (event) {
        sortUsers(event.target.value);
    });
    fetchUsers();
});
function redirectToUserDetails(userId) {
    window.location.href = `user-details.html?id=${userId}`;
}
