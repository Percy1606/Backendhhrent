#!/usr/bin/env bash
# ============================================================
#  Backup semanal HT-RENT
#  Base de datos MySQL + fotos (backend/uploads)
#
#  Uso:
#    ./backup.sh                 -> backup manual
#
#  Programar en cron (domingos 2:00 AM), agregar la línea:
#    0 2 * * 0 /root/backups/backup.sh >> /root/backups/backup.log 2>&1
# ============================================================

set -euo pipefail

# ---------- CONFIGURACIÓN (ajusta estas 2 rutas) ----------
PROJECT_DIR="/root/hhtrent"      # dónde vive el proyecto en tu VPS
BACKUP_DIR="/root/backups"       # dónde se guardan las copias
KEEP=4                           # cuántas copias conservar (4 = 1 mes semanal)
# -----------------------------------------------------------

ENV_FILE="$PROJECT_DIR/backend/.env"

echo "=== Backup $(date '+%Y-%m-%d %H:%M:%S') ==="

# ---------- Leer DATABASE_URL desde backend/.env ----------
# Formato Prisma: mysql://usuario:password@host:puerto/base
DATABASE_URL="$(grep '^DATABASE_URL=' "$ENV_FILE" | head -n1 | cut -d= -f2- | tr -d '"' | tr -d "'")"
if [ -z "$DATABASE_URL" ]; then
  echo "ERROR: no encontré DATABASE_URL en $ENV_FILE"; exit 1
fi

url="${DATABASE_URL#mysql://}"
creds="${url%%@*}"
user="${creds%%:*}"
pass="${creds#*:}"
hostport_db="${url#*@}"
hostport="${hostport_db%%/*}"
host="${hostport%%:*}"
port="${hostport#*:}"
db="${hostport_db#*/}"

STAMP="$(date +%Y-%m-%d_%H%M)"
mkdir -p "$BACKUP_DIR"

# ---------- 1) Copia de la base de datos ----------
echo "→ Respaldando base de datos: $db"
mysqldump -h "$host" -P "$port" -u "$user" -p"$pass" --single-transaction "$db" \
  | gzip > "$BACKUP_DIR/db_$STAMP.sql.gz"
echo "  ✔ db_$STAMP.sql.gz"

# ---------- 2) Copia de las fotos ----------
if [ -d "$PROJECT_DIR/backend/uploads" ]; then
  echo "→ Respaldando fotos (uploads)"
  tar czf "$BACKUP_DIR/uploads_$STAMP.tar.gz" -C "$PROJECT_DIR/backend" uploads
  echo "  ✔ uploads_$STAMP.tar.gz"
else
  echo "  ⚠ No existe $PROJECT_DIR/backend/uploads, se omite"
fi

# ---------- 3) Rotación: borrar copias viejas ----------
echo "→ Rotación (conservar $KEEP)"
ls -1t "$BACKUP_DIR"/db_*.sql.gz 2>/dev/null | tail -n +$((KEEP + 1)) | xargs -r rm -f --
ls -1t "$BACKUP_DIR"/uploads_*.tar.gz 2>/dev/null | tail -n +$((KEEP + 1)) | xargs -r rm -f --
echo "  ✔ Espacio usado: $(du -sh "$BACKUP_DIR" | cut -f1)"

echo "=== Backup terminado OK ==="
