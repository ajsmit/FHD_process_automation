"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.createTable('title_registrations', (table) => {
            table.increments('id').primary();
            table.integer('student_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
            table.integer('supervisor_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
            table.string('proposed_title').notNullable();
            table.text('abstract');
            table.enum('status', ['pending_approval', 'approved', 'rejected']).notNullable().defaultTo('pending_approval');
            table.timestamp('submission_date').defaultTo(knex.fn.now());
            table.timestamp('approval_date');
            table.timestamps(true, true);
        });
    });
}
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.dropTable('title_registrations');
    });
}
