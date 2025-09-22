// Family Sync and Multiple Children Support

// Enhanced App State for multiple children
let familyState = {
    familyCode: '',
    children: [],
    currentChildId: null,
    lastSyncTime: null,
    syncEnabled: false
};

// Initialize family features
function initializeFamilyFeatures() {
    loadFamilyData();
    setupChildSelector();
    setupFamilySync();

    // Add child button
    document.getElementById('addChildBtn').addEventListener('click', addNewChild);

    // Child selector change
    document.getElementById('childSelector').addEventListener('change', switchChild);

    // Family sync buttons
    document.getElementById('connectFamily').addEventListener('click', connectToFamily);
    document.getElementById('syncNow').addEventListener('click', syncFamilyData);
}

// Load family data
function loadFamilyData() {
    const savedFamily = localStorage.getItem('familyData');
    if (savedFamily) {
        familyState = JSON.parse(savedFamily);
    }

    // Create default child if none exist
    if (familyState.children.length === 0) {
        const defaultChild = {
            id: 'child_' + Date.now(),
            name: 'Little Reader',
            birthDate: '',
            books: [],
            createdAt: new Date().toISOString()
        };
        familyState.children.push(defaultChild);
        familyState.currentChildId = defaultChild.id;
        saveFamilyData();
    }
}

// Save family data
function saveFamilyData() {
    localStorage.setItem('familyData', JSON.stringify(familyState));

    // Also save to family cloud if connected
    if (familyState.syncEnabled && familyState.familyCode) {
        saveFamilyToCloud();
    }
}

// Setup child selector dropdown
function setupChildSelector() {
    const selector = document.getElementById('childSelector');
    selector.innerHTML = '';

    familyState.children.forEach(child => {
        const option = document.createElement('option');
        option.value = child.id;
        option.textContent = child.name;
        if (child.id === familyState.currentChildId) {
            option.selected = true;
        }
        selector.appendChild(option);
    });

    // Update children list in settings
    updateChildrenList();
}

// Update children list in settings
function updateChildrenList() {
    const childrenList = document.getElementById('childrenList');

    if (familyState.children.length === 0) {
        childrenList.innerHTML = '<p style="color: #6b7280;">No children added yet.</p>';
        return;
    }

    childrenList.innerHTML = familyState.children.map(child => {
        const age = child.birthDate ? calculateAge(child.birthDate) : 'Age not set';
        const bookCount = child.books ? child.books.length : 0;
        const isActive = child.id === familyState.currentChildId;

        return `
            <div style="
                padding: 1rem;
                background: ${isActive ? '#dbeafe' : 'white'};
                border-radius: 8px;
                margin-bottom: 0.5rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border: ${isActive ? '2px solid #0284c7' : '1px solid #e5e7eb'};
            ">
                <div>
                    <strong>${child.name}</strong>
                    ${isActive ? '<span style="color: #0284c7; margin-left: 0.5rem;">✓ Active</span>' : ''}
                    <div style="font-size: 0.85rem; color: #6b7280; margin-top: 0.25rem;">
                        ${age} • ${bookCount} books read
                    </div>
                </div>
                <div style="display: flex; gap: 0.5rem;">
                    ${!isActive ? `
                        <button onclick="setActiveChild('${child.id}')" style="
                            padding: 0.25rem 0.75rem;
                            background: #0284c7;
                            color: white;
                            border: none;
                            border-radius: 6px;
                            cursor: pointer;
                            font-size: 0.85rem;
                        ">Switch</button>
                    ` : ''}
                    <button onclick="removeChild('${child.id}')" style="
                        padding: 0.25rem 0.75rem;
                        background: #ef4444;
                        color: white;
                        border: none;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 0.85rem;
                    ">Remove</button>
                </div>
            </div>
        `;
    }).join('');
}

// Add new child
function addNewChild() {
    const name = document.getElementById('newChildName').value.trim();
    const birthDate = document.getElementById('newChildBirthdate').value;

    if (!name) {
        showToast('Please enter a child name', 'error');
        return;
    }

    const newChild = {
        id: 'child_' + Date.now(),
        name: name,
        birthDate: birthDate,
        books: [],
        createdAt: new Date().toISOString()
    };

    familyState.children.push(newChild);
    saveFamilyData();

    // Clear inputs
    document.getElementById('newChildName').value = '';
    document.getElementById('newChildBirthdate').value = '';

    // Update UI
    setupChildSelector();
    showToast(`Added ${name} to your family! 🎉`);
}

// Switch active child
function switchChild(e) {
    const childId = e.target.value;
    setActiveChild(childId);
}

// Set active child
window.setActiveChild = function(childId) {
    // Save current child's books first
    const currentChild = familyState.children.find(c => c.id === familyState.currentChildId);
    if (currentChild) {
        currentChild.books = appState.books;
    }

    // Switch to new child
    familyState.currentChildId = childId;
    const newChild = familyState.children.find(c => c.id === childId);

    if (newChild) {
        // Load new child's books
        appState.books = newChild.books || [];
        appState.user.childName = newChild.name;
        appState.user.birthDate = newChild.birthDate;

        // Update UI
        setupChildSelector();
        if (typeof updateDashboard === 'function') {
            updateDashboard();
        }
        saveFamilyData();

        showToast(`Switched to ${newChild.name}'s reading journey!`);
    }
}

// Remove child
window.removeChild = function(childId) {
    if (familyState.children.length === 1) {
        showToast('Cannot remove the only child', 'error');
        return;
    }

    const child = familyState.children.find(c => c.id === childId);
    if (confirm(`Remove ${child.name} and all their reading data?`)) {
        familyState.children = familyState.children.filter(c => c.id !== childId);

        // If removing active child, switch to first available
        if (familyState.currentChildId === childId) {
            setActiveChild(familyState.children[0].id);
        }

        saveFamilyData();
        setupChildSelector();
        showToast(`${child.name} removed`);
    }
}

// Calculate age from birthdate
function calculateAge(birthDate) {
    const birth = new Date(birthDate);
    const today = new Date();
    const years = today.getFullYear() - birth.getFullYear();
    const months = today.getMonth() - birth.getMonth();

    if (years === 0) {
        return `${months} months`;
    } else if (years === 1) {
        return '1 year';
    } else {
        return `${years} years`;
    }
}

// Family Sync Functions
function setupFamilySync() {
    // Load saved family code
    const familyCode = document.getElementById('familyCode');
    if (familyState.familyCode) {
        familyCode.value = familyState.familyCode;
        updateSyncStatus('connected');
    }
}

// Connect to family
function connectToFamily() {
    const code = document.getElementById('familyCode').value.trim().toUpperCase();

    if (!code || code.length !== 6) {
        showToast('Please enter a 6-character family code', 'error');
        return;
    }

    familyState.familyCode = code;
    familyState.syncEnabled = true;
    saveFamilyData();

    // Try to load existing family data
    loadFamilyFromCloud(code);

    updateSyncStatus('connected');
    showToast(`Connected to family: ${code} 🏠`);
}

// Sync family data
function syncFamilyData() {
    if (!familyState.familyCode) {
        showToast('Please connect to a family first', 'error');
        return;
    }

    // Save current child's data
    const currentChild = familyState.children.find(c => c.id === familyState.currentChildId);
    if (currentChild) {
        currentChild.books = appState.books;
    }

    // Save to cloud
    saveFamilyToCloud();

    // Load from cloud to get other family members' updates
    loadFamilyFromCloud(familyState.familyCode);

    updateSyncStatus('synced');
    showToast('Family data synced! ☁️');
}

// Save family data to cloud (using localStorage with family code as key)
// In a real app, this would be an API call to a server
function saveFamilyToCloud() {
    const cloudKey = `family_${familyState.familyCode}`;
    const cloudData = {
        children: familyState.children,
        lastUpdated: new Date().toISOString(),
        devices: getDeviceId()
    };

    // Simulate cloud storage with localStorage
    // In production, this would be an API call
    localStorage.setItem(cloudKey, JSON.stringify(cloudData));

    familyState.lastSyncTime = new Date().toISOString();
}

// Load family data from cloud
function loadFamilyFromCloud(code) {
    const cloudKey = `family_${code}`;
    const cloudData = localStorage.getItem(cloudKey);

    if (cloudData) {
        const data = JSON.parse(cloudData);

        // Merge children data (don't overwrite, just update)
        data.children.forEach(cloudChild => {
            const localChild = familyState.children.find(c => c.id === cloudChild.id);

            if (localChild) {
                // Merge books (avoid duplicates)
                const localBookIds = new Set(localChild.books.map(b => b.id));
                cloudChild.books.forEach(book => {
                    if (!localBookIds.has(book.id)) {
                        localChild.books.push(book);
                    }
                });
            } else {
                // Add new child from cloud
                familyState.children.push(cloudChild);
            }
        });

        saveFamilyData();
        setupChildSelector();
        updateDashboard();

        showToast(`Loaded ${data.children.length} children from family cloud 📥`);
    } else {
        // First time connecting - save current data
        saveFamilyToCloud();
    }
}

// Get unique device ID
function getDeviceId() {
    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
        deviceId = 'device_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('deviceId', deviceId);
    }
    return deviceId;
}

// Update sync status display
function updateSyncStatus(status) {
    const statusDiv = document.getElementById('syncStatus');
    statusDiv.style.display = 'block';

    switch(status) {
        case 'connected':
            statusDiv.style.background = '#dcfce7';
            statusDiv.style.color = '#166534';
            statusDiv.innerHTML = `✅ Connected to family: ${familyState.familyCode}`;
            break;
        case 'synced':
            statusDiv.style.background = '#dbeafe';
            statusDiv.style.color = '#1e40af';
            statusDiv.innerHTML = `☁️ Last synced: ${new Date().toLocaleTimeString()}`;
            break;
        case 'error':
            statusDiv.style.background = '#fee2e2';
            statusDiv.style.color = '#991b1b';
            statusDiv.innerHTML = '❌ Sync error. Please try again.';
            break;
    }
}

// Enhanced toast function with error type
function showToastMessage(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    if (toast && toastMessage) {
        toast.style.background = type === 'error' ? '#ef4444' : '#10b981';
        toastMessage.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Use the app's showToast if available, otherwise use our version
function showToast(message, type = 'success') {
    if (typeof window.showToast === 'function' && type === 'success') {
        window.showToast(message);
    } else {
        showToastMessage(message, type);
    }
}

// Initialize when window loads (after app.js)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFamilyFeatures);
} else {
    // DOM is already loaded
    initializeFamilyFeatures();
}