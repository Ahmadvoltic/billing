import { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { EmailTable } from '../EmailAccounts';
import { SearchIcon, GridIcon } from '../../assets';
import { useGetAllEmailAccounts, useGetAllCustomFields, useGetCurrentUser } from '../../lib/queries';
import { useUpdateEmailAccount, useDeleteCustomField } from '../../lib/mutations';
import {
  getUniqueStatuses,
  getUniqueSources,
  sortByStatus
} from '../../utils/helpers';
import AddCustomFieldModal from '../Modals/AddCustomFieldModal';
import EditCustomValueModal from '../Modals/EditCustomValueModal';
import EditSourcesModal from '../Modals/EditSourcesModal';
import EditPhoneModal from '../Modals/EditPhoneModal';
import DeleteFieldModal from '../Modals/DeleteFieldModal';
import FilterDropdown from '../Filters/FilterDropdown';
import DateRangeFilter from '../Filters/DateRangeFilter';

const MainContent = ({ activeTab }) => {
  const { data: currentUserData } = useGetCurrentUser();
  const currentUser = currentUserData?.user;
  const isViewer = currentUser?.role === 'viewer';
  const canManageFields = ['super_admin', 'admin'].includes(currentUser?.role);
  const [searchQuery, setSearchQuery] = useState('');
  const [paidFirst, setPaidFirst] = useState(true);
  const [showAddFieldModal, setShowAddFieldModal] = useState(false);
  const [showEditValueModal, setShowEditValueModal] = useState(false);
  const [showEditSourcesModal, setShowEditSourcesModal] = useState(false);
  const [showEditPhoneModal, setShowEditPhoneModal] = useState(false);
  const [showDeleteFieldModal, setShowDeleteFieldModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [fieldToDelete, setFieldToDelete] = useState(null);

  // Filter states
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Fetch email accounts using TanStack Query
  const filters = {
    search: searchQuery,
    status: selectedStatuses,
    sources: selectedSources,
    startDate,
    endDate,
  };

  const { data: emailAccounts = [], isLoading, error } = useGetAllEmailAccounts(
    activeTab === 'email-accounts' ? filters : null
  );

  const { data: customFields = [] } = useGetAllCustomFields();

  const updateEmailAccountMutation = useUpdateEmailAccount();
  const deleteCustomFieldMutation = useDeleteCustomField();

  // Get unique statuses and sources from current dataset
  const availableStatuses = useMemo(() => getUniqueStatuses(emailAccounts), [emailAccounts]);
  const availableSources = useMemo(() => getUniqueSources(emailAccounts), [emailAccounts]);

  // Get page title based on active tab
  const pageTitle = activeTab === 'email-accounts' ? 'Email Accounts' : 'Settings';

  // Sort data
  const processedData = useMemo(() => {
    if (activeTab === 'settings') return [];
    return sortByStatus(emailAccounts, paidFirst);
  }, [emailAccounts, paidFirst, activeTab]);

  const handleSortByStatus = () => {
    setPaidFirst(prev => !prev);
  };

  const handleEditCustomFields = (item) => {
    setSelectedItem(item);
    setShowEditValueModal(true);
  };

  const handleEditSources = (item) => {
    setSelectedItem(item);
    setShowEditSourcesModal(true);
  };

  const handleEditPhone = (item) => {
    setSelectedItem(item);
    setShowEditPhoneModal(true);
  };

  const handleDeleteCustomField = (fieldId, fieldName) => {
    setFieldToDelete({ id: fieldId, name: fieldName });
    setShowDeleteFieldModal(true);
  };

  const confirmDeleteCustomField = async () => {
    if (fieldToDelete) {
      try {
        await deleteCustomFieldMutation.mutateAsync(fieldToDelete.id);
        toast.success('Custom field deleted successfully!');
        setShowDeleteFieldModal(false);
        setFieldToDelete(null);
      } catch (error) {
        console.error('Failed to delete custom field:', error);
        toast.error('Failed to delete custom field');
      }
    }
  };

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  // Render settings content
  if (activeTab === 'settings') {
    return (
      <div className="h-full p-6">
        <div className="bg-white h-full w-full rounded-2xl border border-border-color shadow-sm overflow-hidden">
          <div className="h-full p-8 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2 text-text-primary">Settings</h2>
              <p className="text-text-secondary">Configure your application settings</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render email accounts content
  return (
    <div className="h-full p-6 overflow-auto">
      <div className="bg-white h-full w-full rounded-2xl border border-border-color shadow-sm overflow-hidden">
        <div className="h-full p-6">
          {/* Page Title */}
          <h1 className="text-2xl font-semibold text-text-primary mb-6">
            {pageTitle}
          </h1>

          {/* Controls Bar */}
          <div className="flex items-center justify-between mb-6">
            {/* Search Input */}
            <div className="relative w-80">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <input
                type="text"
                placeholder="Search by email, name, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-10 pr-4 border border-border-color rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              {/* Status Filter */}
              <FilterDropdown
                label="All statuses"
                options={availableStatuses}
                selectedValues={selectedStatuses}
                onSelectionChange={setSelectedStatuses}
              />

              {/* Source Filter */}
              <FilterDropdown
                label="All sources"
                options={availableSources}
                selectedValues={selectedSources}
                onSelectionChange={setSelectedSources}
              />

              {/* Date Range Filter */}
              <DateRangeFilter
                startDate={startDate}
                endDate={endDate}
                onDateChange={handleDateChange}
              />

              {/* Grid Icon Button */}
              <button
                className="p-2 border border-border-color rounded-lg hover:bg-gray-50"
                aria-label="Grid view"
              >
                <GridIcon className="w-5 h-5 text-text-secondary" />
              </button>

              {/* Add New Button */}
              {canManageFields && (
                <button
                  onClick={() => setShowAddFieldModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                >
                  <span className="text-lg leading-none">+</span>
                  <span>Add New Field</span>
                </button>
              )}
            </div>
          </div>

          {/* Email Table */}
          <EmailTable
            data={processedData}
            onSortByStatus={handleSortByStatus}
            customFields={customFields}
            onEditCustomFields={isViewer ? null : handleEditCustomFields}
            onEditSources={isViewer ? null : handleEditSources}
            onEditPhone={isViewer ? null : handleEditPhone}
            onDeleteCustomField={canManageFields ? handleDeleteCustomField : null}
            isViewer={isViewer}
            canManageFields={canManageFields}
          />
        </div>
      </div>

      {/* Modals */}
      <AddCustomFieldModal
        isOpen={showAddFieldModal}
        onClose={() => setShowAddFieldModal(false)}
      />

      <EditCustomValueModal
        isOpen={showEditValueModal}
        onClose={() => setShowEditValueModal(false)}
        customFields={customFields}
        currentValues={selectedItem?.customFields || {}}
        itemId={selectedItem?._id}
      />

      <EditSourcesModal
        isOpen={showEditSourcesModal}
        onClose={() => setShowEditSourcesModal(false)}
        currentSources={selectedItem?.sources || []}
        itemId={selectedItem?._id}
      />

      <EditPhoneModal
        isOpen={showEditPhoneModal}
        onClose={() => setShowEditPhoneModal(false)}
        currentPhone={selectedItem?.phoneNumber || ''}
        itemId={selectedItem?._id}
      />

      <DeleteFieldModal
        isOpen={showDeleteFieldModal}
        onClose={() => {
          setShowDeleteFieldModal(false);
          setFieldToDelete(null);
        }}
        onConfirm={confirmDeleteCustomField}
        fieldName={fieldToDelete?.name || ''}
      />
    </div>
  );
};

export default MainContent;
