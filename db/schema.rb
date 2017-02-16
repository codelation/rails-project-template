# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161119203729) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_admin_comments", force: :cascade do |t|
    t.string   "namespace"
    t.text     "body"
    t.string   "resource_id",   null: false
    t.string   "resource_type", null: false
    t.integer  "author_id"
    t.string   "author_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "active_admin_comments", ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id", using: :btree
  add_index "active_admin_comments", ["namespace"], name: "index_active_admin_comments_on_namespace", using: :btree
  add_index "active_admin_comments", ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id", using: :btree

  create_table "admin_users", force: :cascade do |t|
    t.string   "name"
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.integer  "failed_attempts",        default: 0,  null: false
    t.string   "unlock_token"
    t.datetime "locked_at"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  add_index "admin_users", ["email"], name: "index_admin_users_on_email", unique: true, using: :btree
  add_index "admin_users", ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true, using: :btree
  add_index "admin_users", ["unlock_token"], name: "index_admin_users_on_unlock_token", unique: true, using: :btree

  create_table "application_features", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.string   "icon_name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "application_features_plans", force: :cascade do |t|
    t.integer "plan_id"
    t.integer "feature_id"
  end

  add_index "application_features_plans", ["feature_id"], name: "app_feat_feat_plans", using: :btree
  add_index "application_features_plans", ["plan_id"], name: "app_plan_feat_plans", using: :btree

  create_table "application_plans", force: :cascade do |t|
    t.integer  "amount_in_cents", default: 0
    t.string   "name"
    t.integer  "billed",          default: 0
    t.boolean  "payment",         default: true
    t.boolean  "visible",         default: true
    t.text     "description"
    t.text     "permissions",                    array: true
    t.string   "icon_name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "delayed_jobs", force: :cascade do |t|
    t.integer  "priority",   default: 0, null: false
    t.integer  "attempts",   default: 0, null: false
    t.text     "handler",                null: false
    t.text     "last_error"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string   "locked_by"
    t.string   "queue"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "delayed_jobs", ["priority", "run_at"], name: "delayed_jobs_priority", using: :btree

  create_table "user_accounts", force: :cascade do |t|
    t.string   "customer_id"
    t.integer  "status",              default: 0
    t.boolean  "access",              default: true
    t.text     "unaccessible_reason"
    t.integer  "application_plan_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "user_accounts", ["application_plan_id"], name: "index_user_accounts_on_application_plan_id", using: :btree
  add_index "user_accounts", ["customer_id"], name: "index_user_accounts_on_customer_id", using: :btree

  create_table "user_authentications", force: :cascade do |t|
    t.string   "name"
    t.string   "email",                  default: "",   null: false
    t.string   "encrypted_password",     default: "",   null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,    null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
    t.boolean  "access",                 default: true
    t.text     "unaccessible_reason"
    t.integer  "personal_team_id"
    t.string   "invitation_token"
    t.datetime "invitation_created_at"
    t.datetime "invitation_sent_at"
    t.datetime "invitation_accepted_at"
    t.integer  "invitation_limit"
    t.integer  "invited_by_id"
    t.string   "invited_by_type"
    t.integer  "invitations_count",      default: 0
  end

  add_index "user_authentications", ["email"], name: "index_user_authentications_on_email", unique: true, using: :btree
  add_index "user_authentications", ["invitation_token"], name: "index_user_authentications_on_invitation_token", unique: true, using: :btree
  add_index "user_authentications", ["invitations_count"], name: "index_user_authentications_on_invitations_count", using: :btree
  add_index "user_authentications", ["invited_by_id"], name: "index_user_authentications_on_invited_by_id", using: :btree
  add_index "user_authentications", ["reset_password_token"], name: "index_user_authentications_on_reset_password_token", unique: true, using: :btree

  create_table "user_meta", force: :cascade do |t|
    t.integer  "authentication_id"
    t.string   "name"
    t.jsonb    "data",              default: {}
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "user_meta", ["authentication_id"], name: "index_user_meta_on_authentication_id", using: :btree

  create_table "user_team_associations", force: :cascade do |t|
    t.integer "team_id"
    t.integer "authentication_id"
    t.text    "permissions",       array: true
  end

  add_index "user_team_associations", ["authentication_id"], name: "user_auth_auth_team", using: :btree
  add_index "user_team_associations", ["team_id"], name: "user_team_auth_team", using: :btree

  create_table "user_teams", force: :cascade do |t|
    t.integer  "account_id"
    t.boolean  "share_account",          default: true
    t.integer  "parent_team_id"
    t.string   "name"
    t.integer  "application_model_id"
    t.string   "application_model_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "user_teams", ["account_id"], name: "index_user_teams_on_account_id", using: :btree
  add_index "user_teams", ["application_model_id"], name: "index_user_teams_on_application_model_id", using: :btree
  add_index "user_teams", ["parent_team_id"], name: "index_user_teams_on_parent_team_id", using: :btree

  create_table "user_transactions", force: :cascade do |t|
    t.integer  "account_id"
    t.integer  "application_plan_id"
    t.float    "amount",              default: 0.0
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "user_transactions", ["account_id"], name: "index_user_transactions_on_account_id", using: :btree
  add_index "user_transactions", ["application_plan_id"], name: "index_user_transactions_on_application_plan_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
