-- CreateTable
CREATE TABLE `Familia` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Familia_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subfamilia` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `familiaId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Subfamilia_familiaId_nombre_key`(`familiaId`, `nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Equipo` (
    `id` VARCHAR(191) NOT NULL,
    `codigoInterno` VARCHAR(191) NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `familiaId` VARCHAR(191) NULL,
    `subfamiliaId` VARCHAR(191) NULL,
    `marca` VARCHAR(191) NULL,
    `modelo` VARCHAR(191) NULL,
    `serie` VARCHAR(191) NULL,
    `anio` INTEGER NULL,
    `proveedor` VARCHAR(191) NULL,
    `costo` DECIMAL(12, 2) NULL,
    `valorComercial` DECIMAL(12, 2) NULL,
    `valorReposicion` DECIMAL(12, 2) NULL,
    `estado` ENUM('DISPONIBLE', 'RESERVADO', 'ALQUILADO', 'EN_MANTENIMIENTO', 'EN_CALIBRACION', 'FUERA_DE_SERVICIO', 'EN_REPARACION', 'DADO_DE_BAJA') NOT NULL DEFAULT 'DISPONIBLE',
    `ubicacion` VARCHAR(191) NOT NULL,
    `categoria` VARCHAR(191) NOT NULL,
    `descripcion` TEXT NOT NULL,
    `precio` DECIMAL(10, 2) NULL,
    `unidad` VARCHAR(191) NULL,
    `tipo` ENUM('ALQUILER', 'VENTA', 'PROYECTO') NOT NULL,
    `imagenUrl` VARCHAR(191) NOT NULL,
    `imagenThumbUrl` VARCHAR(191) NULL,
    `disponible` BOOLEAN NOT NULL DEFAULT true,
    `destacado` BOOLEAN NOT NULL DEFAULT false,
    `observaciones` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Equipo_codigoInterno_key`(`codigoInterno`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DocumentoEquipo` (
    `id` VARCHAR(191) NOT NULL,
    `equipoId` VARCHAR(191) NOT NULL,
    `tipo` ENUM('FOTOGRAFIA', 'MANUAL', 'FICHA_TECNICA', 'CERTIFICADO', 'FACTURA', 'GARANTIA', 'OTRO') NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `mimeType` VARCHAR(191) NULL,
    `tamano` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HistorialEquipo` (
    `id` VARCHAR(191) NOT NULL,
    `equipoId` VARCHAR(191) NOT NULL,
    `tipo` ENUM('COMPRA', 'PRIMER_ALQUILER', 'ALQUILER', 'MANTENIMIENTO', 'CALIBRACION', 'REPARACION', 'INSPECCION', 'OBSERVACION', 'INCIDENTE', 'CAMBIO_ESTADO') NOT NULL,
    `descripcion` TEXT NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `usuarioNombre` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `rol` ENUM('ADMINISTRADOR', 'GERENCIA', 'COMERCIAL', 'LOGISTICA', 'OPERACIONES', 'CONTABILIDAD', 'ALMACEN', 'CONSULTA') NOT NULL DEFAULT 'CONSULTA',
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `resetToken` VARCHAR(191) NULL,
    `resetTokenExpira` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Usuario_email_key`(`email`),
    UNIQUE INDEX `Usuario_resetToken_key`(`resetToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AuditoriaLog` (
    `id` VARCHAR(191) NOT NULL,
    `usuarioId` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `rol` VARCHAR(191) NULL,
    `accion` VARCHAR(191) NOT NULL,
    `entidad` VARCHAR(191) NOT NULL,
    `entidadId` VARCHAR(191) NULL,
    `detalle` TEXT NULL,
    `ip` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cotizacion` (
    `id` VARCHAR(191) NOT NULL,
    `clienteNombre` VARCHAR(191) NOT NULL,
    `clienteEmpresa` VARCHAR(191) NULL,
    `clienteEmail` VARCHAR(191) NOT NULL,
    `clienteTelefono` VARCHAR(191) NOT NULL,
    `mensaje` TEXT NULL,
    `totalEstimado` DECIMAL(10, 2) NULL,
    `estado` VARCHAR(191) NOT NULL DEFAULT 'PENDIENTE',
    `contratoId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Cotizacion_contratoId_key`(`contratoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CotizacionItem` (
    `id` VARCHAR(191) NOT NULL,
    `cotizacionId` VARCHAR(191) NOT NULL,
    `equipoId` VARCHAR(191) NOT NULL,
    `cantidad` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContratoAlquiler` (
    `id` VARCHAR(191) NOT NULL,
    `numero` VARCHAR(191) NOT NULL,
    `clienteNombre` VARCHAR(191) NOT NULL,
    `clienteEmpresa` VARCHAR(191) NULL,
    `clienteDocumento` VARCHAR(191) NULL,
    `clienteEmail` VARCHAR(191) NOT NULL,
    `clienteTelefono` VARCHAR(191) NOT NULL,
    `proyecto` VARCHAR(191) NOT NULL,
    `sede` VARCHAR(191) NOT NULL,
    `fechaInicio` DATETIME(3) NOT NULL,
    `fechaFin` DATETIME(3) NOT NULL,
    `estado` ENUM('BORRADOR', 'CONFIRMADO', 'EN_CURSO', 'FINALIZADO', 'CANCELADO') NOT NULL DEFAULT 'BORRADOR',
    `subtotal` DECIMAL(12, 2) NULL,
    `igv` DECIMAL(12, 2) NULL,
    `total` DECIMAL(12, 2) NULL,
    `condiciones` TEXT NULL,
    `observaciones` TEXT NULL,
    `responsableNombre` VARCHAR(191) NULL,
    `usuarioId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ContratoAlquiler_numero_key`(`numero`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContratoItem` (
    `id` VARCHAR(191) NOT NULL,
    `contratoId` VARCHAR(191) NOT NULL,
    `equipoId` VARCHAR(191) NOT NULL,
    `cantidad` INTEGER NOT NULL DEFAULT 1,
    `precioUnitario` DECIMAL(10, 2) NULL,
    `subtotal` DECIMAL(12, 2) NULL,

    UNIQUE INDEX `ContratoItem_contratoId_equipoId_key`(`contratoId`, `equipoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inspeccion` (
    `id` VARCHAR(191) NOT NULL,
    `contratoId` VARCHAR(191) NOT NULL,
    `tipo` ENUM('ENTREGA', 'RETORNO') NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `responsableNombre` VARCHAR(191) NULL,
    `observaciones` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InspeccionItem` (
    `id` VARCHAR(191) NOT NULL,
    `inspeccionId` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `resultado` ENUM('OK', 'NO_OK', 'NA') NOT NULL DEFAULT 'NA',
    `observacion` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrdenTrabajo` (
    `id` VARCHAR(191) NOT NULL,
    `numero` VARCHAR(191) NOT NULL,
    `equipoId` VARCHAR(191) NOT NULL,
    `tipo` ENUM('PREVENTIVO', 'CORRECTIVO', 'CALIBRACION', 'INSPECCION') NOT NULL,
    `prioridad` ENUM('BAJA', 'MEDIA', 'ALTA', 'URGENTE') NOT NULL DEFAULT 'MEDIA',
    `estado` ENUM('PENDIENTE', 'EN_PROGRESO', 'COMPLETADO', 'CANCELADO') NOT NULL DEFAULT 'PENDIENTE',
    `descripcion` TEXT NOT NULL,
    `fechaProgramada` DATETIME(3) NOT NULL,
    `fechaInicio` DATETIME(3) NULL,
    `fechaFin` DATETIME(3) NULL,
    `tecnicoResponsable` VARCHAR(191) NULL,
    `costoRepuestos` DECIMAL(12, 2) NULL,
    `costoManoObra` DECIMAL(12, 2) NULL,
    `observaciones` TEXT NULL,
    `usuarioId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `OrdenTrabajo_numero_key`(`numero`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TareaMantenimiento` (
    `id` VARCHAR(191) NOT NULL,
    `ordenTrabajoId` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `realizado` BOOLEAN NOT NULL DEFAULT false,
    `observacion` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlanMantenimiento` (
    `id` VARCHAR(191) NOT NULL,
    `equipoId` VARCHAR(191) NOT NULL,
    `frecuencia` VARCHAR(191) NOT NULL,
    `descripcion` TEXT NOT NULL,
    `proximaFecha` DATETIME(3) NOT NULL,
    `ultimaFecha` DATETIME(3) NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Subfamilia` ADD CONSTRAINT `Subfamilia_familiaId_fkey` FOREIGN KEY (`familiaId`) REFERENCES `Familia`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Equipo` ADD CONSTRAINT `Equipo_familiaId_fkey` FOREIGN KEY (`familiaId`) REFERENCES `Familia`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Equipo` ADD CONSTRAINT `Equipo_subfamiliaId_fkey` FOREIGN KEY (`subfamiliaId`) REFERENCES `Subfamilia`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DocumentoEquipo` ADD CONSTRAINT `DocumentoEquipo_equipoId_fkey` FOREIGN KEY (`equipoId`) REFERENCES `Equipo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistorialEquipo` ADD CONSTRAINT `HistorialEquipo_equipoId_fkey` FOREIGN KEY (`equipoId`) REFERENCES `Equipo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuditoriaLog` ADD CONSTRAINT `AuditoriaLog_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cotizacion` ADD CONSTRAINT `Cotizacion_contratoId_fkey` FOREIGN KEY (`contratoId`) REFERENCES `ContratoAlquiler`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CotizacionItem` ADD CONSTRAINT `CotizacionItem_cotizacionId_fkey` FOREIGN KEY (`cotizacionId`) REFERENCES `Cotizacion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CotizacionItem` ADD CONSTRAINT `CotizacionItem_equipoId_fkey` FOREIGN KEY (`equipoId`) REFERENCES `Equipo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContratoAlquiler` ADD CONSTRAINT `ContratoAlquiler_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContratoItem` ADD CONSTRAINT `ContratoItem_contratoId_fkey` FOREIGN KEY (`contratoId`) REFERENCES `ContratoAlquiler`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContratoItem` ADD CONSTRAINT `ContratoItem_equipoId_fkey` FOREIGN KEY (`equipoId`) REFERENCES `Equipo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inspeccion` ADD CONSTRAINT `Inspeccion_contratoId_fkey` FOREIGN KEY (`contratoId`) REFERENCES `ContratoAlquiler`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InspeccionItem` ADD CONSTRAINT `InspeccionItem_inspeccionId_fkey` FOREIGN KEY (`inspeccionId`) REFERENCES `Inspeccion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrdenTrabajo` ADD CONSTRAINT `OrdenTrabajo_equipoId_fkey` FOREIGN KEY (`equipoId`) REFERENCES `Equipo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrdenTrabajo` ADD CONSTRAINT `OrdenTrabajo_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TareaMantenimiento` ADD CONSTRAINT `TareaMantenimiento_ordenTrabajoId_fkey` FOREIGN KEY (`ordenTrabajoId`) REFERENCES `OrdenTrabajo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlanMantenimiento` ADD CONSTRAINT `PlanMantenimiento_equipoId_fkey` FOREIGN KEY (`equipoId`) REFERENCES `Equipo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

