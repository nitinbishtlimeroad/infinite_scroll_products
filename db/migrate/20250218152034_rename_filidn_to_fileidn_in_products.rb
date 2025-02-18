class RenameFilidnToFileidnInProducts < ActiveRecord::Migration[7.2]
  def change
    rename_column :products, :filidn, :fileidn
  end
end
