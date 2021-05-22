using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace HajosTeszt.ProverbModels
{
    public partial class ProverbContext : DbContext
    {
        public ProverbContext()
        {
        }

        public ProverbContext(DbContextOptions<ProverbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Proverb> Proverbs { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=rhsjam.database.windows.net;Initial Catalog=Proverb;Persist Security Info=True;User ID=rhsjam;Password=Password123");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Proverb>(entity =>
            {
                entity.ToTable("Proverb");

                entity.Property(e => e.ProverbId).HasColumnName("ProverbID");

                entity.Property(e => e.ProverbText).IsRequired();
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
