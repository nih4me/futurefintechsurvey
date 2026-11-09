let allSubmissions = [];
let filteredSubmissions = [];
let currentPage = 1;
const itemsPerPage = 10;

async function fetchSubmissions() {
    const tableBody = document.getElementById('submissionsBody');
    const loading = document.getElementById('loading');
    const table = document.getElementById('submissionsTable');
    const pagination = document.getElementById('pagination');

    try {
        const response = await fetch('/api/submissions/');

        if (response.status === 401) {
            alert('Unauthorized. Please log in with admin credentials.');
            return;
        }

        if (!response.ok) {
            throw new Error('Failed to fetch submissions');
        }

        allSubmissions = await response.json();
        filteredSubmissions = [...allSubmissions];

        renderTable();

        loading.style.display = 'none';
        table.style.display = 'table';
        pagination.style.display = 'flex';
    } catch (error) {
        console.error('Error:', error);
        loading.textContent = 'Error loading submissions: ' + error.message;
    }
}

function renderTable() {
    const tableBody = document.getElementById('submissionsBody');
    const pageInfo = document.getElementById('pageInfo');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');

    tableBody.innerHTML = '';

    if (filteredSubmissions.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No submissions found.</td></tr>';
        document.getElementById('pagination').style.display = 'none';
        return;
    }

    document.getElementById('pagination').style.display = 'flex';

    // Pagination logic
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = filteredSubmissions.slice(startIndex, endIndex);

    paginatedItems.forEach(sub => {
        const row = document.createElement('tr');
        const created = sub.created_at ? new Date(sub.created_at).toLocaleString() : 'N/A';
        const updated = sub.updated_at ? new Date(sub.updated_at).toLocaleString() : 'N/A';

        row.innerHTML = `
            <td><code>${sub.submission_id}</code></td>
            <td>${sub.email}</td>
            <td>${created}</td>
            <td>${updated}</td>
            <td>${sub.status}</td>
            <td>
                <button class="btn-delete" onclick="deleteSubmission('${sub.submission_id}')">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Update pagination controls
    const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);
    pageInfo.textContent = `Page ${currentPage} of ${totalPages || 1}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;
}

function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    filteredSubmissions = allSubmissions.filter(sub =>
        sub.submission_id.toLowerCase().includes(searchTerm) ||
        sub.email.toLowerCase().includes(searchTerm)
    );
    currentPage = 1;
    renderTable();
}

function changePage(direction) {
    currentPage += direction;
    renderTable();
}

async function deleteSubmission(id) {
    if (!confirm(`Are you sure you want to delete submission ${id}? This action cannot be undone.`)) {
        return;
    }

    try {
        const response = await fetch(`/api/submissions/${id}`, {
            method: 'DELETE'
        });

        if (response.status === 401) {
            alert('Unauthorized. Please log in with admin credentials.');
            return;
        }

        if (!response.ok) {
            throw new Error('Failed to delete submission');
        }

        alert('Submission deleted successfully');
        // Refresh data
        await fetchSubmissions();
    } catch (error) {
        console.error('Error:', error);
        alert('Error deleting submission: ' + error.message);
    }
}

window.onload = fetchSubmissions;
