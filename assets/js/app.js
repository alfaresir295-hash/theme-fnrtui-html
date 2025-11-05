/**
 * Main Application Module - Initializes all components and handles global functionality
 */

// Main application initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts
    if (typeof initializeCharts === 'function') {
        initializeCharts();
    }

    // Initialize table data
    if (typeof initializePaymentsTable === 'function') {
        initializePaymentsTable();
    }

    // Add interactivity
    if (typeof addEventListeners === 'function') {
        addEventListeners();
    }

    console.log('Dashboard application initialized successfully');
});

// Global utility functions
window.DashboardApp = {
    // Theme utilities
    setTheme: function(theme) {
        if (window.ThemeManager) {
            window.ThemeManager.setTheme(theme);
        }
    },

    // Notification utilities
    showNotification: function(message, type = 'info', duration = 3000) {
        if (typeof showNotification === 'function') {
            showNotification(message, type, duration);
        }
    },

    // Chart utilities
    refreshCharts: function() {
        if (typeof initializeCharts === 'function') {
            initializeCharts();
        }
    },

    // Table utilities
    refreshTable: function() {
        if (typeof initializePaymentsTable === 'function') {
            // Clear existing table data
            const tableBody = document.getElementById('paymentsTableBody');
            if (tableBody) {
                tableBody.innerHTML = '';
            }
            // Reinitialize
            initializePaymentsTable();
        }
    },

    // General utilities
    formatCurrency: function(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    },

    formatDate: function(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(new Date(date));
    },

    // API simulation utilities
    simulateApiCall: function(endpoint, delay = 1000) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    data: { message: `API call to ${endpoint} successful` },
                    timestamp: new Date().toISOString()
                });
            }, delay);
        });
    }
};

// Performance monitoring
function logPerformanceMetrics() {
    if (performance && performance.timing) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
    }
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Global error caught:', e.error);
    
    // You can implement error reporting here
    // For example, send to an error tracking service
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    
    // Prevent the default browser behavior
    e.preventDefault();
});

// Log performance metrics when page is fully loaded
window.addEventListener('load', logPerformanceMetrics);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DashboardApp };
}
