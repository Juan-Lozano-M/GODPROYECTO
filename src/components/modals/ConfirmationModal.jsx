import PropTypes from 'prop-types';

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmar Acción",
  message = "¿Estás seguro de que deseas realizar esta acción?",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  isLoading = false,
  loadingText = "Procesando...",
  variant = "danger", // "danger", "warning", "info"
  icon = null
}) => {
  if (!isOpen) return null;

  // Configuración de estilos según el variant
  const variantStyles = {
    danger: {
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      buttonBg: "bg-red-500 hover:bg-red-600",
      defaultIcon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      )
    },
    warning: {
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      buttonBg: "bg-yellow-500 hover:bg-yellow-600",
      defaultIcon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 3l8.5 14.5H3.5L12 3z" />
        </svg>
      )
    },
    info: {
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      buttonBg: "bg-blue-500 hover:bg-blue-600",
      defaultIcon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  };

  const currentVariant = variantStyles[variant] || variantStyles.danger;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <div className="text-center">
          {/* Icono */}
          <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full ${currentVariant.iconBg} mb-6`}>
            <div className={currentVariant.iconColor}>
              {icon || currentVariant.defaultIcon}
            </div>
          </div>
          
          {/* Título */}
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {title}
          </h3>
          
          {/* Mensaje */}
          <p className="text-gray-600 mb-8">
            {message}
          </p>
          
          {/* Botones */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className={`px-6 py-3 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 ${currentVariant.buttonBg}`}
            >
              {isLoading ? loadingText : confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  isLoading: PropTypes.bool,
  loadingText: PropTypes.string,
  variant: PropTypes.oneOf(['danger', 'warning', 'info']),
  icon: PropTypes.element
};

export default ConfirmationModal;
